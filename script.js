    (function () {
      var header = document.getElementById('siteHeader');
      var backToTop = document.getElementById('backToTop');
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        header.classList.toggle('scrolled', y > 10);
        backToTop.classList.toggle('show', y > 500);
      }, { passive: true });

      var hbtn = document.getElementById('hamburgerBtn');
      var navLinks = document.getElementById('navLinks');
      hbtn.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        hbtn.classList.toggle('active', open);
        hbtn.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hbtn.classList.remove('active');
          hbtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });

      // Scroll reveal
      var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduce && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
          });
        }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
        document.querySelectorAll('[data-animate]').forEach(function (el) { io.observe(el); });
      } else {
        document.querySelectorAll('[data-animate]').forEach(function (el) { el.classList.add('in-view'); });
      }

      // Quote form (client-side demo — wire to your backend/email service to go live)
      var form = document.getElementById('quoteForm');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        document.getElementById('formFields').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
      });
    })();
