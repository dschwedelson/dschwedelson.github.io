// Dark mode toggle: remembers choice, defaults to system preference
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('.icon');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    const dark = theme === 'dark';
    icon.textContent = dark ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  apply(saved || system);

  btn.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Fade sections in as they scroll into view
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
