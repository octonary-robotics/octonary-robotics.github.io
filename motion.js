(() => {
  'use strict';

  const root = document.documentElement;
  const stage = document.querySelector('.symbol-stage');
  const toggle = document.querySelector('.motion-toggle');
  if (!stage || !toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const copy = {
    en: { label: 'Animated effects', on: 'Motion on', off: 'Motion off' },
    de: { label: 'Animationseffekte', on: 'Animation an', off: 'Animation aus' },
    'zh-CN': { label: '页面动效', on: '动效开启', off: '动效暂停' },
  }[root.lang] || { label: 'Animated effects', on: 'Motion on', off: 'Motion off' };

  let paused = false;
  let frame = 0;
  let pointer = null;
  const animations = new Map();
  root.dataset.pageHidden = String(document.hidden);
  const enabled = () => !paused && !reducedMotion.matches;
  const resetTilt = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pointer = null;
    stage.style.removeProperty('--tilt-x');
    stage.style.removeProperty('--tilt-y');
    stage.style.removeProperty('--light-x');
    stage.style.removeProperty('--light-y');
  };

  function syncMotion() {
    root.dataset.motion = enabled() ? 'on' : 'off';
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(enabled()));
    toggle.setAttribute('aria-label', `${enabled() ? copy.on : copy.off} — ${copy.label}`);
    toggle.querySelector('span').textContent = enabled() ? copy.on : copy.off;
    if (!enabled()) {
      resetTilt();
      for (const animation of animations.keys()) animation.cancel();
      animations.clear();
    }
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    syncMotion();
  });
  reducedMotion.addEventListener('change', syncMotion);
  finePointer.addEventListener('change', resetTilt);
  syncMotion();

  // Visibility is never stored in CSS: unsupported or failed JS leaves all copy readable.
  function reveal(element, delay = 0) {
    if (!element || !enabled() || document.hidden || element.contains(document.activeElement) || typeof element.animate !== 'function') return;
    const animation = element.animate([
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 760, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
    animations.set(animation, element);
    animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
  }

  document.querySelectorAll('.hero > div:first-child > *').forEach((element, index) => reveal(element, index * 85));
  reveal(document.querySelector('.hero-art'), 160);
  document.addEventListener('focusin', event => {
    for (const [animation, element] of animations) {
      if (element.contains(event.target)) {
        animation.cancel();
        animations.delete(animation);
      }
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-top, .focus-row, .tool-list > li, .project-link, .main-site').forEach(element => observer.observe(element));

    const stageObserver = new IntersectionObserver(([entry]) => {
      root.dataset.heroVisible = String(entry.isIntersecting);
      if (!entry.isIntersecting) resetTilt();
    });
    stageObserver.observe(stage);
  }

  stage.addEventListener('pointermove', event => {
    if (!enabled() || !finePointer.matches || event.pointerType !== 'mouse') return;
    pointer = { x: event.clientX, y: event.clientY };
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!pointer || !enabled()) return;
      const bounds = stage.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (pointer.x - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (pointer.y - bounds.top) / bounds.height));
      stage.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
      stage.style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`);
      stage.style.setProperty('--light-x', `${x * 100}%`);
      stage.style.setProperty('--light-y', `${y * 100}%`);
    });
  }, { passive: true });
  stage.addEventListener('pointerleave', resetTilt);
  stage.addEventListener('pointercancel', resetTilt);
  document.addEventListener('visibilitychange', () => {
    root.dataset.pageHidden = String(document.hidden);
    if (document.hidden) resetTilt();
  });
})();
