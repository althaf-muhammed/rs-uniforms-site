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

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Items in a grid arrive one after another rather than all at once
  document.querySelectorAll('.stats, .checks, .sectors, .range, .timeline, .process__side').forEach(function (group) {
    var items = group.querySelectorAll(':scope > [data-reveal], :scope > li');
    items.forEach(function (item, i) {
      item.setAttribute('data-reveal', '');
      item.style.setProperty('--d', (i % 3) * 90 + 'ms');
    });
  });

  // Header gets a soft shadow once the page scrolls
  var header = document.querySelector('.site-header');
  function onScrollHeader() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  if (!reduceMotion) {
    // Photo bands drift slightly slower than the page
    var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    // The timeline's gold line fills in as you read down it
    var timeline = document.querySelector('.timeline');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var vh = window.innerHeight;
        parallax.forEach(function (band) {
          var r = band.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 to 1
          band.style.setProperty('--shift', (progress * -6).toFixed(2) + '%');
        });
        if (timeline) {
          var t = timeline.getBoundingClientRect();
          var filled = Math.min(1, Math.max(0, (vh * 0.6 - t.top) / t.height));
          timeline.style.setProperty('--fill', filled.toFixed(3));
          timeline.querySelectorAll('li').forEach(function (li) {
            li.classList.toggle('is-reached', li.getBoundingClientRect().top < vh * 0.6);
          });
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // Garments on the rail swing on their hangers when touched
    document.querySelectorAll('[data-swing]').forEach(function (el) {
      function swing() {
        if (el.classList.contains('is-swinging')) return;
        el.classList.add('is-swinging');
      }
      el.addEventListener('mouseenter', swing);
      el.addEventListener('touchstart', swing, { passive: true });
      el.addEventListener('animationend', function () { el.classList.remove('is-swinging'); });
    });

    if (finePointer) {
      // Cards tilt gently towards the pointer, with a soft light across them
      document.querySelectorAll('[data-tilt]').forEach(function (card) {
        var max = parseFloat(card.getAttribute('data-tilt')) || 5;
        card.addEventListener('pointermove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width;
          var y = (e.clientY - r.top) / r.height;
          card.style.setProperty('--ry', ((x - 0.5) * max * 2).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((0.5 - y) * max * 2).toFixed(2) + 'deg');
          card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
          card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
          card.classList.add('is-tilting');
        });
        card.addEventListener('pointerleave', function () {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
          card.classList.remove('is-tilting');
        });
      });

      // The cover picture has depth: the person, circle and ring move by different amounts
      var hero = document.querySelector('.hero');
      var art = document.querySelector('.hero__art');
      if (hero && art) {
        hero.addEventListener('pointermove', function (e) {
          var r = hero.getBoundingClientRect();
          art.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
          art.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        });
        hero.addEventListener('pointerleave', function () {
          art.style.setProperty('--px', '0');
          art.style.setProperty('--py', '0');
        });
      }
    }
  }

  if ('IntersectionObserver' in window) {
    // Sections ease in as they arrive
    var revealItems = document.querySelectorAll('[data-reveal]');
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(function (el) {
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
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
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
