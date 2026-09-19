import { useEffect, useRef } from 'react';
import { LASER_FRAGMENT_SHADER, LASER_VERTEX_SHADER } from './laserShaders';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DENSITY_MAX,
  DENSITY_MIN,
  DRAW_ARRAY_COUNT,
  HOST_CLASS,
  HUE_MAX,
  HUE_MIN,
  LASER_VARIANT_BG,
  LASER_VARIANT_DEFAULTS,
  LENGTH_MAX,
  LENGTH_MIN,
  MIN_BOUNDS_EDGE,
  MIN_CANVAS_DIM,
  OPACITY_MAX,
  OPACITY_MIN,
  PIXEL_RATIO_CAP,
  POINTER_LERP,
  REDUCED_MOTION_TIME,
  SATURATION_MAX,
  SATURATION_MIN,
  SIZE_MAX,
  SIZE_MIN,
  SPEED_MAX,
  SPEED_MIN,
  TIME_SCALE,
  VARIANT_ID,
  VARIANT_INDEX,
} from './constants';

const VARIANT_INDEX_MAP = {
  'atmospheric-blade': 0,
  'vanishing-array': 1,
  'prism-aperture': 2,
  'halftone-relay': 3,
};

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create Laser shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Laser shader compilation failed';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function resolveVariant(variant) {
  return variant in VARIANT_INDEX_MAP ? variant : VARIANT_ID;
}

/**
 * Exact LaserVariants renderer (atmospheric-blade and sibling laser variants).
 * Ported from registered LaserVariants.tsx — Raw WebGL, pointer-reactive.
 */
export function LaserVariants({ className = '', style, ...props }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const redrawRef = useRef(() => undefined);
  const optionsRef = useRef({ ...LASER_VARIANT_DEFAULTS, ...props });
  optionsRef.current = { ...LASER_VARIANT_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    });
    if (!gl) return undefined;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, LASER_VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, LASER_FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return undefined;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) ?? 'Laser program link failed';
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      throw new Error(message);
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      time: gl.getUniformLocation(program, 'u_time'),
      variant: gl.getUniformLocation(program, 'u_variant'),
      size: gl.getUniformLocation(program, 'u_size'),
      length: gl.getUniformLocation(program, 'u_length'),
      density: gl.getUniformLocation(program, 'u_density'),
      hue: gl.getUniformLocation(program, 'u_hue'),
      saturation: gl.getUniformLocation(program, 'u_saturation'),
      brightness: gl.getUniformLocation(program, 'u_brightness'),
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let frame = 0;
    let visible = true;
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    const startedAt = performance.now();

    const draw = (now) => {
      const options = optionsRef.current;
      const variant = resolveVariant(options.variant);
      pointerX += (targetX - pointerX) * (reducedMotion ? 1 : POINTER_LERP);
      pointerY += (targetY - pointerY) * (reducedMotion ? 1 : POINTER_LERP);

      gl.useProgram(program);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, pointerX, pointerY);
      gl.uniform1f(
        uniforms.time,
        reducedMotion
          ? REDUCED_MOTION_TIME
          : (now - startedAt) * TIME_SCALE * clamp(options.speed, SPEED_MIN, SPEED_MAX),
      );
      gl.uniform1f(uniforms.variant, VARIANT_INDEX_MAP[variant]);
      gl.uniform1f(uniforms.size, clamp(options.size, SIZE_MIN, SIZE_MAX));
      gl.uniform1f(uniforms.length, clamp(options.length, LENGTH_MIN, LENGTH_MAX));
      gl.uniform1f(uniforms.density, clamp(options.density, DENSITY_MIN, DENSITY_MAX));
      gl.uniform1f(uniforms.hue, clamp(options.hue, HUE_MIN, HUE_MAX));
      gl.uniform1f(uniforms.saturation, clamp(options.saturation, SATURATION_MIN, SATURATION_MAX));
      gl.uniform1f(uniforms.brightness, clamp(options.brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX));
      gl.drawArrays(gl.TRIANGLES, 0, DRAW_ARRAY_COUNT);
    };

    const schedule = () => {
      if (!reducedMotion && visible && !document.hidden && !frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    function render(now) {
      frame = 0;
      draw(now);
      schedule();
    }

    const syncAnimation = () => {
      if (reducedMotion || !visible || document.hidden) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        draw(performance.now());
        return;
      }
      schedule();
    };
    redrawRef.current = () => draw(performance.now());

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, PIXEL_RATIO_CAP);
      canvas.width = Math.max(MIN_CANVAS_DIM, Math.round(bounds.width * pixelRatio));
      canvas.height = Math.max(MIN_CANVAS_DIM, Math.round(bounds.height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(performance.now());
    };

    const handlePointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      targetX =
        ((event.clientX - bounds.left) / Math.max(MIN_BOUNDS_EDGE, bounds.width)) * 2 - 1;
      targetY =
        -(((event.clientY - bounds.top) / Math.max(MIN_BOUNDS_EDGE, bounds.height)) * 2 - 1);
      if (reducedMotion) draw(performance.now());
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (reducedMotion) draw(performance.now());
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      syncAnimation();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      syncAnimation();
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    host.addEventListener('pointermove', handlePointerMove, { passive: true });
    host.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    document.addEventListener('visibilitychange', syncAnimation);
    motionQuery.addEventListener('change', handleMotionChange);
    resize();
    syncAnimation();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', handlePointerMove);
      host.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionQuery.removeEventListener('change', handleMotionChange);
      redrawRef.current = () => undefined;
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  useEffect(() => {
    redrawRef.current();
  }, [
    props.variant,
    props.speed,
    props.size,
    props.length,
    props.density,
    props.hue,
    props.saturation,
    props.brightness,
  ]);

  const opacity = clamp(optionsRef.current.opacity, OPACITY_MIN, OPACITY_MAX);
  const hostClassName = className ? `${HOST_CLASS} ${className}` : HOST_CLASS;

  return (
    <div
      ref={hostRef}
      className={hostClassName}
      data-variant={resolveVariant(optionsRef.current.variant)}
      data-variant-index={VARIANT_INDEX}
      style={{ background: LASER_VARIANT_BG, ...style }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ opacity, pointerEvents: 'none' }} />
    </div>
  );
}

export default LaserVariants;
