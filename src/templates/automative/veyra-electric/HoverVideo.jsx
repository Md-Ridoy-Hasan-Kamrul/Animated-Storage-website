import React, { useEffect, useRef } from 'react';
import { SEEK_EPSILON, WATCHDOG_MS } from './constants';
import { nextPreviewClip } from './utils/hoverQueue';

const sources = {
  drive: ['/media/hood-hover-forward.mp4', '/media/hood-hover-reverse.mp4'],
  battery: ['/media/battery-hover-forward.mp4', '/media/battery-hover-reverse.mp4'],
};

export default function HoverVideo({ desired, mode, reduced, onNeutral }) {
  const canvas = useRef(null);
  const state = useRef({ desired, mode, reduced, onNeutral });
  const reconcile = useRef(() => {});
  state.current = { desired, mode, reduced, onNeutral };

  useEffect(() => {
    const surface = canvas.current;
    const context = surface.getContext('2d', { alpha: false });
    const videos = new Map();
    let disposed = false;
    let settled = null;
    let active = null;
    let running = false;
    let frozen = false;
    let failed = false;
    let generation = 0;
    let raf = 0;
    let watchdog = 0;
    let cancelFrame;

    Object.entries(sources).forEach(([id, pair]) =>
      pair.forEach((src, direction) => {
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.src = src;
        videos.set(`${id}-${direction}`, video);
      }),
    );

    function draw(video) {
      if (video.readyState < 2 || video.seeking || !video.videoWidth) return;
      if (surface.width !== video.videoWidth || surface.height !== video.videoHeight) {
        surface.width = video.videoWidth;
        surface.height = video.videoHeight;
      }
      context.drawImage(video, 0, 0, surface.width, surface.height);
      surface.style.opacity = '1';
    }

    function stop() {
      generation += 1;
      active?.pause();
      if (active) active.onended = active.onerror = active.onloadeddata = active.onseeked = null;
      cancelFrame?.();
      cancelFrame = undefined;
      cancelAnimationFrame(raf);
      clearTimeout(watchdog);
      running = false;
      active = null;
    }

    function update() {
      if (disposed) return;
      const props = state.current;
      if (props.mode === 'entering') {
        if (!frozen) {
          stop();
          frozen = true;
        }
        return;
      }
      if (props.mode === 'detail' || props.reduced) {
        stop();
        settled = null;
        frozen = false;
        surface.style.opacity = '0';
        props.onNeutral?.(true);
        return;
      }
      if (props.mode !== 'overview' || running || failed) return;
      frozen = false;
      const next = nextPreviewClip(settled, props.desired);
      if (!next) return;
      const video = videos.get(`${next.id}-${next.reverse ? 1 : 0}`);
      active = video;
      running = true;
      props.onNeutral?.(false);
      const token = (generation += 1);
      const valid = () => !disposed && generation === token;

      function fail() {
        if (!valid()) return;
        stop();
        failed = true;
        state.current.onNeutral?.(true);
      }
      function complete() {
        if (!valid()) return;
        draw(video);
        stop();
        settled = next.reverse ? null : next.id;
        state.current.onNeutral?.(settled === null);
        update();
      }
      function paint() {
        if (!valid()) return;
        draw(video);
        if ('requestVideoFrameCallback' in video) {
          const handle = video.requestVideoFrameCallback(paint);
          cancelFrame = () => video.cancelVideoFrameCallback(handle);
        } else {
          raf = requestAnimationFrame(paint);
        }
      }
      function start() {
        if (!valid()) return;
        video.onseeked = video.onloadeddata = null;
        if ('requestVideoFrameCallback' in video) {
          const handle = video.requestVideoFrameCallback(paint);
          cancelFrame = () => video.cancelVideoFrameCallback(handle);
        } else raf = requestAnimationFrame(paint);
        video.play().catch(fail);
      }
      function prepare() {
        if (!valid()) return;
        video.onloadeddata = null;
        if (video.currentTime > SEEK_EPSILON) {
          video.onseeked = start;
          video.currentTime = 0;
        } else start();
      }
      video.onended = complete;
      video.onerror = fail;
      watchdog = window.setTimeout(fail, WATCHDOG_MS);
      if (video.readyState >= 2) prepare();
      else {
        video.onloadeddata = prepare;
        video.load();
      }
    }

    reconcile.current = update;
    update();
    return () => {
      disposed = true;
      stop();
      reconcile.current = () => {};
      videos.forEach((video) => {
        video.removeAttribute('src');
        video.load();
      });
    };
  }, []);

  useEffect(() => {
    reconcile.current();
  }, [desired, mode, reduced]);

  return <canvas ref={canvas} className="hover-video" aria-hidden="true" />;
}
