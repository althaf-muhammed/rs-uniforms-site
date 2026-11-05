(function () {
  'use strict';

  var WHATSAPP_NUMBER = '919742324242';

  // Email links are put together here so the address isn't sitting in the page source for simple scrapers
  document.querySelectorAll('.js-email').forEach(function (link) {
    var address = link.dataset.user + '@' + link.dataset.domain;
    link.href = 'mailto:' + address + '?subject=' + encodeURIComponent('Uniform enquiry');
    if (link.textContent.indexOf('[at]') !== -1) link.textContent = address;
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Garments on the rail sway when you touch them
  document.querySelectorAll('.rack__slot').forEach(function (slot) {
    function sway() {
      if (slot.classList.contains('is-swaying')) return;
      slot.classList.add('is-swaying');
    }
    slot.addEventListener('mouseenter', sway);
    slot.addEventListener('touchstart', sway, { passive: true });
    slot.addEventListener('animationend', function () {
      slot.classList.remove('is-swaying');
    });
  });

  if ('IntersectionObserver' in window) {
    // Sections ease in as they arrive
    var revealItems = document.querySelectorAll(
      '.section__head, .split__head, .about, .facts, .row, .sector, .range li, .branding-head, .methods li, .fabric, .steps li, .contact__info, .enquiry'
    );
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(function (el) {
      el.classList.add('reveal');
      revealer.observe(el);
    });

    // Mark the section being read in the nav
    var links = {};
    nav.querySelectorAll('a[href^="#"]:not(.site-nav__cta)').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // Enquiry form: writes the message, then hands over to WhatsApp.
  // The site has no server, so nothing is stored or sent from here.
  var form = document.getElementById('enquiry');

  function showError(field, show) {
    var error = document.getElementById(field.id + '-error');
    if (error) error.hidden = !show;
    if (show) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', field.id + '-error');
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') && e.target.value.trim()) showError(e.target, false);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var who = form.elements.who;
    var qty = form.elements.qty;
    var when = form.elements.when.value.trim();
    var note = form.elements.note.value.trim();

    var firstInvalid = null;
    [who, qty].forEach(function (field) {
      var missing = !field.value.trim();
      showError(field, missing);
      if (missing && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var lines = [
      'Hello R&S Uniforms, I would like to ask about uniforms.',
      '',
      'For: ' + who.value,
      'How many: ' + qty.value.trim()
    ];
    if (when) lines.push('By when: ' + when);
    if (note) lines.push('', note);

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    var opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    else window.location.href = url;
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
