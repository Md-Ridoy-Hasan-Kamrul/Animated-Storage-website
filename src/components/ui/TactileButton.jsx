import React, { forwardRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './tactileButton.css';

const VERTEX = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

const FRAGMENT = [
  'precision highp float;',
  'uniform vec2 u_res;',
  'uniform float u_time;',
  'uniform float u_level;',
  'uniform float u_tilt;',
  'uniform float u_slosh;',
  'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}',
  'float noise(vec2 p){',
  '  vec2 i=floor(p), f=fract(p);',
  '  vec2 u=f*f*(3.0-2.0*f);',
  '  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),',
  '             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);',
  '}',
  'float fbm(vec2 p){',
  '  float v=0.0; float a=0.5;',
  '  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.04+vec2(11.3,7.1); a*=0.5; }',
  '  return v;',
  '}',
  'void main(){',
  '  vec2 uv = gl_FragCoord.xy / u_res;',
  '  float ar = u_res.x / u_res.y;',
  '  float x = uv.x * ar;',
  '  float t = u_time;',
  '  float amp = 0.012 + u_slosh * 0.045;',
  '  float surf = u_level',
  '    + u_tilt * (uv.x - 0.5) * 0.34',
  '    + amp * sin(x * 5.1 + t * 4.6)',
  '    + amp * 0.62 * sin(x * 9.7 + t * (-6.8) + 1.7)',
  '    + amp * 0.38 * sin(x * 14.3 + t * 8.9 + 4.2);',
  '  float d = surf - uv.y;',
  '  vec3 col = mix(vec3(0.03, 0.06, 0.1), vec3(0.05, 0.09, 0.15), uv.y);',
  '  col += vec3(0.02, 0.05, 0.1) * pow(max(0.0, 1.0 - abs(uv.y - 0.88) * 6.0), 2.0);',
  '  float inside = smoothstep(0.0, 0.012, d);',
  '  float depth = clamp(d / max(u_level, 0.001), 0.0, 1.0);',
  '  vec3 liq = mix(vec3(0.0, 0.9, 1.0), vec3(0.02, 0.15, 0.45), depth);',
  '  float caust = fbm(vec2(x * 4.2, (uv.y + t * 0.14) * 4.2));',
  '  liq *= 0.8 + 0.42 * caust;',
  '  liq += vec3(0.02, 0.25, 0.35) * pow(max(0.0, d * 3.0), 1.5) * u_slosh;',
  '  col = mix(col, liq, inside);',
  '  col += vec3(0.4, 0.9, 1.0) * exp(-abs(d) * 80.0) * 0.85;',
  '  col += vec3(0.8, 0.98, 1.0) * exp(-abs(d) * 220.0) * 0.5;',
  '  vec2 e = uv * (1.0 - uv);',
  '  col *= 0.55 + 0.45 * pow(e.x * e.y * 16.0, 0.22);',
  '  gl_FragColor = vec4(col, 1.0);',
  '}',
].join('\n');

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createGl(canvas) {
  try {
    return canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
      powerPreference: 'low-power',
    });
  } catch {
    return null;
  }
}

/**
 * Site CTA with the Tactile fluid look.
 * CSS fluid fallback is always underneath. WebGL mounts only while visible
 * so multiple CTAs do not exhaust the browser context limit.
 */
const TactileButton = forwardRef(function TactileButton(
  {
    to,
    type = 'button',
    size = 'md',
    className = '',
    children,
    disabled = false,
    ...props
  },
  ref,
) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || disabled) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let gl = null;
    let program = null;
    let raf = 0;
    let running = false;
    let visible = false;
    let painted = false;
    let last = performance.now();
    let lastX = null;
    let level = 0.56;
    let gulp = 0;
    let slosh = 0.4;
    let tilt = 0;
    let tiltTarget = 0;
    let uRes;
    let uTime;
    let uLevel;
    let uTilt;
    let uSlosh;

    function tearDown() {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      painted = false;
      canvas.classList.remove('is-ready');
      if (gl) {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        gl = null;
        program = null;
      }
    }

    function resize() {
      if (!gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function loop(now) {
      raf = 0;
      if (!running || !gl || document.hidden || !visible) return;

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      slosh *= Math.exp(-1.5 * dt);
      gulp *= Math.exp(-1.1 * dt);
      tilt += (tiltTarget - tilt) * Math.min(1, dt * 5);
      level += (0.56 - 0.36 * gulp - level) * Math.min(1, dt * 5.5);

      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now / 1000);
      gl.uniform1f(uLevel, level);
      gl.uniform1f(uTilt, tilt);
      gl.uniform1f(uSlosh, slosh);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!painted) {
        painted = true;
        canvas.classList.add('is-ready');
      }
      raf = requestAnimationFrame(loop);
    }

    function kick() {
      if (!running || raf || document.hidden || !visible || !gl) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function mount() {
      if (gl || !visible) return;
      gl = createGl(canvas);
      if (!gl) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (!vs || !fs) {
        tearDown();
        return;
      }

      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        tearDown();
        return;
      }
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const locP = gl.getAttribLocation(program, 'p');
      gl.enableVertexAttribArray(locP);
      gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

      uRes = gl.getUniformLocation(program, 'u_res');
      uTime = gl.getUniformLocation(program, 'u_time');
      uLevel = gl.getUniformLocation(program, 'u_level');
      uTilt = gl.getUniformLocation(program, 'u_tilt');
      uSlosh = gl.getUniformLocation(program, 'u_slosh');

      running = true;
      resize();
      kick();
    }

    function onMove(event) {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(1, rect.width);
      if (lastX !== null) slosh = Math.min(1.4, slosh + Math.abs(x - lastX) * 2.6);
      lastX = x;
      tiltTarget = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    }

    function onLeave() {
      lastX = null;
      tiltTarget = 0;
    }

    function onFocus() {
      slosh = Math.min(1.4, slosh + 0.5);
    }

    function onClick() {
      gulp = 1;
      slosh = Math.min(1.4, slosh + 0.7);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.05);
        if (visible) mount();
        else tearDown();
      },
      { threshold: [0, 0.05, 0.25] },
    );
    observer.observe(root);

    function onVisibility() {
      if (!document.hidden && visible) kick();
    }

    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    root.addEventListener('focus', onFocus);
    root.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      root.removeEventListener('focus', onFocus);
      root.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
      tearDown();
    };
  }, [disabled]);

  const setRef = (node) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const classes = [
    'tactile-btn',
    size === 'sm' ? 'tactile-btn--sm' : '',
    size === 'lg' ? 'tactile-btn--lg' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <canvas ref={canvasRef} className="tactile-btn__canvas" aria-hidden="true" />
      <span className="tactile-btn__label">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link ref={setRef} to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={setRef} type={type} disabled={disabled} className={classes} {...props}>
      {content}
    </button>
  );
});

TactileButton.displayName = 'TactileButton';

export default TactileButton;
