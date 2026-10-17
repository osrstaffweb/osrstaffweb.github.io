(() => {
  const q = (selector, base = document) => base.querySelector(selector);
  const qa = (selector, base = document) => [...base.querySelectorAll(selector)];
  const year = q('#year'); if (year) year.textContent = new Date().getFullYear();
  const menu = q('#mobile-menu');
  const toggle = q('.mobile-toggle');
  const triggers = qa('.dropdown-trigger');
  function closeDropdowns(exception) {
    triggers.forEach(trigger => {
      if (trigger === exception) return;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.parentElement.classList.remove('is-open');
    });
  }
  triggers.forEach(trigger => trigger.addEventListener('click', e => {
    e.stopPropagation();
    const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
    closeDropdowns(trigger);
    trigger.setAttribute('aria-expanded', String(!wasOpen));
    trigger.parentElement.classList.toggle('is-open', !wasOpen);
  }));
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
      document.body.classList.toggle('nav-open', open);
    });
    qa('a', menu).forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.classList.remove('nav-open');
    }));
  }
  document.addEventListener('click', event => {if (!event.target.closest('.nav-dropdown')) closeDropdowns();});
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeDropdowns();
      if (toggle && menu) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      }
    }
  });
  const header = q('.site-header');
  const progress = q('#progress-track');
  function onScroll() {
    header?.classList.toggle('scrolled', window.scrollY > 14);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${Math.max(0, Math.min(100, max > 0 ? window.scrollY / max * 100 : 0))}%`;
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const inquiry = q('#contact-page-form');
  if (inquiry) inquiry.addEventListener('submit', event => {
    event.preventDefault();
    if (!inquiry.reportValidity()) return;
    const data = new FormData(inquiry);
    const body = [
      'OSR Digital Solutions — Project Inquiry',
      '',
      `Name: ${String(data.get('name') || '').trim()}`,
      `Email: ${String(data.get('email') || '').trim()}`,
      `Interested in: ${String(data.get('service') || '').trim()}`,
      '',
      'Project details:',
      String(data.get('message') || '').trim(),
    ].join('\n');
    q('#prepared-text').value = body;
    const panel = q('#prepared-panel');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  const copy = q('#copy-inquiry');
  copy?.addEventListener('click', async () => {
    const text = q('#prepared-text').value;
    const status = q('#copy-feedback');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(text);
      status.textContent = 'Copied to clipboard';
    } catch (_) {
      q('#prepared-text').focus();
      q('#prepared-text').select();
      status.textContent = 'Select the text above and press Ctrl+C to copy.';
    }
  });
})();
