// Elizabeth Vijan | Tackett Team, eXp Realty — mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.querySelectorAll(':scope > a, .dropdown-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Mobile: tapping "Communities" opens the dropdown instead of following a link
  var dropdownLabel = document.querySelector('.has-dropdown > span');
  var dropdownWrap = document.querySelector('.has-dropdown');
  if (dropdownLabel && dropdownWrap) {
    dropdownLabel.addEventListener('click', function () {
      if (window.innerWidth <= 720) {
        dropdownWrap.classList.toggle('is-open');
      }
    });
  }
});
