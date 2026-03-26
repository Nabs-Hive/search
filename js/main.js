/* =========================================
   S&earch — Main JS
   Nav, Reveal, Counters, FAQ, Mobile menu
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Nav scroll ─────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Active nav link ────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── Mobile burger ──────────────────── */
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ─── Reveal on scroll ───────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ─── Compteurs animés ───────────────── */
  const counters = document.querySelectorAll('.count-up');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        const isFloat = el.dataset.float === 'true';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent = (isFloat ? value.toFixed(1) : Math.round(value).toLocaleString('fr')) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }

  /* ─── FAQ accordion ──────────────────── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ─── Smooth scroll anchors ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Filtres offres ─────────────────── */
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.card-offre').forEach(card => {
          const cat = card.dataset.category || '';
          const show = filter === 'all' || cat.includes(filter);
          card.style.display = show ? 'flex' : 'none';
        });
      });
    });
  }

  /* ─── Hex pattern SVG (deco) ─────────── */
  const hexContainers = document.querySelectorAll('.hex-pattern-bg');
  hexContainers.forEach(container => {
    const size = 40;
    const cols = Math.ceil(container.offsetWidth / (size * 1.5)) + 2;
    const rows = Math.ceil(container.offsetHeight / (size * Math.sqrt(3))) + 2;
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * size * 1.5;
        const y = r * size * Math.sqrt(3) + (c % 2) * size * Math.sqrt(3) / 2;
        const pts = Array.from({length: 6}, (_, i) => {
          const a = Math.PI / 180 * (60 * i - 30);
          return `${x + size * Math.cos(a)},${y + size * Math.sin(a)}`;
        }).join(' ');
        svgContent += `<polygon points="${pts}" fill="none" stroke="currentColor" stroke-width="1"/>`;
      }
    }
    svgContent += '</svg>';
    container.innerHTML = svgContent;
  });

});
