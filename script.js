(() => {
  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroVideo = qs('#heroVideo');
  const storyVideo = qs('#storyVideo');
  const storyModal = qs('#storyModal');
  const contactModal = qs('#contactModal');
  const mobileToggle = qs('.mobile-toggle');
  const mobileMenu = qs('#mobile-menu');
  qs('#year').textContent = new Date().getFullYear();

  function setVideoButton(paused) {
    const btn = qs('#toggle-video');
    btn.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    btn.setAttribute('title', paused ? 'Play background video' : 'Pause background video');
    btn.innerHTML = paused
      ? '<svg class="icon"><use href="#i-play"/></svg>'
      : '<svg class="icon"><use href="#i-pause"/></svg>';
  }
  if (reducedMotion) { heroVideo.pause(); setVideoButton(true); }
  heroVideo.addEventListener('pause', () => setVideoButton(true));
  heroVideo.addEventListener('play', () => setVideoButton(false));
  qs('#toggle-video').addEventListener('click', async () => {
    if (heroVideo.paused) { try { await heroVideo.play(); } catch (_) {} }
    else heroVideo.pause();
  });

  // Navigation, including keyboard and touch support.
  const menuTriggers = qsa('.dropdown-trigger');
  function closeDropdowns(except) {
    menuTriggers.forEach(trigger => {
      if (trigger !== except) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.parentElement.classList.remove('is-open');
      }
    });
  }
  menuTriggers.forEach(trigger => trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    closeDropdowns(trigger);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    trigger.parentElement.classList.toggle('is-open', !isOpen);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.nav-dropdown')) closeDropdowns(); });
  mobileToggle.addEventListener('click', () => {
    const open = mobileToggle.getAttribute('aria-expanded') !== 'true';
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !open;
    document.body.classList.toggle('nav-open', open);
  });
  qsa('a', mobileMenu).forEach(a => a.addEventListener('click', () => {
    mobileToggle.setAttribute('aria-expanded', 'false'); mobileMenu.hidden = true;
    document.body.classList.remove('nav-open');
  }));

  // Video dialog reuses the actual local MP4 asset.
  qs('#watch-story').addEventListener('click', () => {
    heroVideo.pause(); storyModal.showModal();
    if (!reducedMotion) storyVideo.play().catch(() => {});
  });
  const closeStory = () => {storyVideo.pause(); storyVideo.currentTime = 0; storyModal.close();};
  qs('#close-story').addEventListener('click', closeStory);
  storyModal.addEventListener('click', e => {if (e.target === storyModal) closeStory();});
  storyModal.addEventListener('close', () => {storyVideo.pause();});

  const closeContact = () => contactModal.close();
  qs('#open-contact').addEventListener('click', () => contactModal.showModal());
  qs('#close-contact').addEventListener('click', closeContact);
  contactModal.addEventListener('click', e => {if (e.target === contactModal) closeContact();});
  qs('#projectForm').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim().split(/\s+/)[0];
    const el = qs('#formStatus');
    el.hidden = false;
    el.textContent = `Thanks, ${name || 'there'}! This is a prototype, so your inquiry was not sent. Connect the form to your backend before launching.`;
  });

  // Interactive process details.
  const steps = [
    {index:'01 / 04',phase:'THE FIRST STEP',title:'Everything starts<br>with understanding.',copy:'We listen, learn about your business, and uncover the opportunity before proposing a solution.',tag:'STRATEGY BEFORE SOLUTIONS',glyph:'?'},
    {index:'02 / 04',phase:'SHAPING THE EXPERIENCE',title:'The right design<br>makes things easier.',copy:'We translate your goals into a clear user journey and a visual direction that feels unmistakably yours.',tag:'CREATIVITY WITH PURPOSE',glyph:'✦'},
    {index:'03 / 04',phase:'TURNING PLANS INTO PRODUCTS',title:'Carefully built.<br>Ready for the real world.',copy:'We bring the experience to life with thoughtful development, quality checks and a practical launch plan.',tag:'DETAILS THAT MAKE THE DIFFERENCE',glyph:'↗'},
    {index:'04 / 04',phase:'THE LONGER VIEW',title:'Launch is a start,<br>not the finish line.',copy:'We look for ways to refine the experience, improve what works and support your next stage of growth.',tag:'IMPROVEMENT THAT CONTINUES',glyph:'∞'}
  ];
  qsa('.process-step').forEach(btn => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.step); const data = steps[i];
    qsa('.process-step').forEach(b => {const active = b === btn; b.classList.toggle('active', active); b.setAttribute('aria-selected', String(active));});
    qs('.process-small-tag').innerHTML = `<span>${data.index}</span> ${data.phase}`;
    qs('#process-title').innerHTML = data.title;
    qs('#process-copy').textContent = data.copy;
    qs('#process-tag').textContent = data.tag;
    qs('.process-visual-inner > span').textContent = data.glyph;
  }));

  const header = qs('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 14);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    qs('#progress-track').style.width = `${Math.max(0, Math.min(100, max > 0 ? window.scrollY/max * 100 : 0))}%`;
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  qsa('.faq-list details').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) qsa('.faq-list details').filter(x => x !== d).forEach(x => {x.open = false;});
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDropdowns();
      if (!mobileMenu.hidden) {mobileMenu.hidden = true;mobileToggle.setAttribute('aria-expanded','false');}
    }
  });
})();
