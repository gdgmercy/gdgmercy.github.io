/* GDG Mercy — tiny site script: mobile nav, active link, bar theme, year, gallery lightbox. */
(function () {
  'use strict';

  var bar = document.getElementById('topbar');
  var nav = document.getElementById('site-nav');
  var btn = document.getElementById('menu-btn');
  var hero = document.querySelector('.hero');
  var mq = window.matchMedia('(max-width: 940px)');

  /* ---- active link (fallback for pages that miss aria-current) ---- */
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (nav && !nav.querySelector('[aria-current]')) {
    nav.querySelectorAll('a.tb-link').forEach(function (a) {
      var file = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (file === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---- bar: dark over the hero, light after it ---- */
  function menuOpen() { return !!(nav && nav.classList.contains('open')); }
  function syncBar() {
    if (!bar) return;
    var overHero = hero ? window.scrollY < hero.offsetHeight - bar.offsetHeight : false;
    bar.classList.toggle('on-dark', overHero || menuOpen());
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { syncBar(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', syncBar);
  syncBar();

  /* ---- mobile menu ---- */
  function setMenu(open, returnFocus) {
    if (!nav || !btn) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    syncBar();
    if (!open && returnFocus) btn.focus();
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(!menuOpen()); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen()) setMenu(false, true);
    });
    document.addEventListener('click', function (e) {
      if (menuOpen() && !e.target.closest('#topbar')) setMenu(false);
    });
    var onBreak = function () { if (!mq.matches && menuOpen()) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onBreak); else mq.addListener(onBreak);
  }

  /* ---- footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- gallery lightbox ---- */
  var dlg = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (dlg && items.length && typeof dlg.showModal === 'function') {
    var img = dlg.querySelector('.lb-img');
    var cap = dlg.querySelector('.lb-cap');
    var idx = 0;

    var show = function (i) {
      idx = (i + items.length) % items.length;
      var a = items[idx];
      var thumb = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = thumb ? thumb.alt : (a.getAttribute('data-alt') || '');
      cap.innerHTML = '';
      cap.appendChild(document.createTextNode(a.getAttribute('data-caption') || ''));
      var n = document.createElement('small');
      n.textContent = (idx + 1) + ' / ' + items.length;
      cap.appendChild(n);
    };
    items.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(i);
        dlg.showModal();
      });
    });
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-in')) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
    });
    var x0 = null;
    dlg.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }
})();
