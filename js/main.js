// Elizabeth Vijan | Tackett Team, eXp Realty - navigation + contact form helpers
document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');

  function closeMenu() {
    if (!links || !toggle) return;
    links.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', isOpen);
    });
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // Dropdowns (click / tap / keyboard friendly)
  document.querySelectorAll('.has-dropdown').forEach(function (wrap) {
    var btn = wrap.querySelector('.nav-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    wrap.addEventListener('mouseenter', function () { if (window.innerWidth > 960) btn.setAttribute('aria-expanded', 'true'); });
    wrap.addEventListener('mouseleave', function () { if (window.innerWidth > 960) { btn.setAttribute('aria-expanded', 'false'); wrap.classList.remove('is-open'); } });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-dropdown.is-open').forEach(function (w) {
      if (!w.contains(e.target) && window.innerWidth > 960) {
        w.classList.remove('is-open');
        var b = w.querySelector('.nav-toggle'); if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Contact form: build a clean pre-filled email (no backend required)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var to = form.getAttribute('data-to');
      var name = (f.first_name.value + ' ' + f.last_name.value).trim();
      var subject = 'Website inquiry: ' + f.interest.value + ' - ' + name;
      var body = 'Name: ' + name + '\nEmail: ' + f.email.value + '\nPhone: ' + (f.phone.value || 'n/a') +
                 '\nInterested in: ' + f.interest.value + '\n\n' + f.message.value;
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
});
