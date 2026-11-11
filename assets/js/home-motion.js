/* Progressive enhancement: content stays visible if motion or observers are unavailable. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ambient = document.querySelector('.home-ambient');
  if (ambient) {
    const syncVisibility = () => ambient.classList.toggle('is-paused', document.hidden);
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
  }

  if (!('IntersectionObserver' in window)) return;

  // Observe separate blocks, never both a block and its children: opacity stays gentle.
  const fadeTargets = document.querySelectorAll([
    '.academic-home .page__title',
    '.academic-home .home-intro',
    '.academic-home .page__content h2',
    '.academic-home .research-project',
    '.academic-home .news-list li',
    '.academic-home .misc-content p',
  ].join(', '));
  const headings = document.querySelectorAll('.academic-home .page__content h2');
  const settled = new WeakSet();
  let fadeObserver;
  let markerObserver;

  const syncMotion = () => {
    fadeObserver?.disconnect();
    markerObserver?.disconnect();
    fadeTargets.forEach(target => target.classList.remove('scroll-fade', 'is-in-view'));
    headings.forEach(target => target.classList.remove('is-arriving'));
    if (preference.matches) return;

    fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting && entry.intersectionRatio >= 0.12));
    }, { rootMargin: '-112px 0px -88px 0px', threshold: 0.12 });
    fadeTargets.forEach(target => {
      target.classList.add('scroll-fade');
      fadeObserver.observe(target);
    });

    markerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        markerObserver.unobserve(target);
        settled.add(target);
        target.addEventListener('animationend', () => target.classList.remove('is-arriving'), { once: true });
        target.classList.add('is-arriving');
      });
    }, { threshold: 0.12 });
    headings.forEach(target => {
      if (!settled.has(target)) markerObserver.observe(target);
    });
  };

  syncMotion();
  preference.addEventListener('change', syncMotion);
})();
