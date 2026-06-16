/* ============================================================
   WAGYU SHOGUN — main.js
   GSAP 3 + ScrollTrigger + Custom Cursor + Gallery
   ============================================================ */

/* ── Wait for GSAP to load ── */
window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  initAll();
});

/* ── Master init ── */
function initAll() {
  initLoader();
  initScrollProgress();
  initNav();
  initCursor();
  initGalleryDrag();
  initMarquee();
}

/* ──────────────────────────────────────
   LOADER
─────────────────────────────────────── */
function initLoader() {
  const loader     = document.querySelector('.loader');
  const loaderLogo = document.querySelector('.loader-logo');
  const loaderKnj  = document.querySelector('.loader-kanji');
  const loaderBar  = document.querySelector('.loader-bar');

  if (!loader) {
    initHeroAnim();
    initScrollAnims();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0, duration: 0.5, ease: 'power2.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          initHeroAnim();
          initScrollAnims();
        }
      });
    }
  });

  tl.to(loaderKnj,  { opacity: 1, y: 0,  duration: 0.5, ease: 'power3.out' }, 0.1)
    .to(loaderLogo,  { opacity: 1,        duration: 0.5, ease: 'power3.out' }, 0.3)
    .to(loaderBar,   { width: '100%', duration: 0.7, ease: 'power2.inOut' },   0.4)
    .to({}, { duration: 0.2 }); // small hold
}

/* ──────────────────────────────────────
   HERO ANIMATION
─────────────────────────────────────── */
function initHeroAnim() {
  const heroLabel   = document.querySelector('.hero .label');
  const heroLines   = document.querySelectorAll('.hero h1 .line-wrap span, .hero h1 em');
  const heroSub     = document.querySelector('.hero-sub');
  const heroCtaBtns = document.querySelectorAll('.hero-cta .btn');
  const heroScroll  = document.querySelector('.hero-scroll');
  const heroBg      = document.querySelector('.hero-bg');

  // Hero parallax on scroll
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  }

  const tl = gsap.timeline({ delay: 0.15 });

  if (heroLabel) {
    tl.from(heroLabel, {
      opacity: 0, y: 14, duration: 0.6, ease: 'power3.out'
    });
  }

  if (heroLines.length) {
    tl.to(heroLines, {
      y: 0, opacity: 1,
      duration: 1.0, stagger: 0.1,
      ease: 'power4.out'
    }, '-=0.3');
  }

  if (heroSub) {
    tl.from(heroSub, {
      opacity: 0, y: 22, duration: 0.8, ease: 'power3.out'
    }, '-=0.4');
  }

  if (heroCtaBtns.length) {
    tl.from(heroCtaBtns, {
      opacity: 0, y: 18, stagger: 0.12, duration: 0.7, ease: 'power3.out'
    }, '-=0.45');
  }

  if (heroScroll) {
    tl.from(heroScroll, { opacity: 0, duration: 0.8 }, '-=0.3');
  }
}

/* ──────────────────────────────────────
   SCROLL ANIMATIONS
─────────────────────────────────────── */
function initScrollAnims() {

  /* — Generic fade-up — */
  document.querySelectorAll('.fade-up').forEach(el => {
    const delay =
      el.classList.contains('fade-up-delay-4') ? 0.4 :
      el.classList.contains('fade-up-delay-3') ? 0.3 :
      el.classList.contains('fade-up-delay-2') ? 0.2 :
      el.classList.contains('fade-up-delay-1') ? 0.1 : 0;

    gsap.from(el, {
      opacity: 0, y: 36, duration: 0.85, delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* — Gold line expand — */
  document.querySelectorAll('.gold-line').forEach(el => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: el.classList.contains('center') ? 'center' : 'left',
      duration: 1.0, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  /* — Stat counters — */
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw    = el.textContent.trim();
    const num    = parseFloat(raw);
    const suffix = raw.replace(/[\d.]+/, '');
    const isInt  = Number.isInteger(num);

    if (!isNaN(num)) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate() {
          const v = isInt ? Math.round(obj.val) : Math.round(obj.val * 10) / 10;
          el.textContent = v + suffix;
        }
      });
    }
  });

  /* — Clip-path image reveal — */
  document.querySelectorAll('.clip-reveal').forEach(el => {
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.3, ease: 'power4.inOut',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
    });
  });

  /* — Menu cards stagger — */
  const menuCards = document.querySelectorAll('.menu-grid .menu-card');
  if (menuCards.length) {
    gsap.from(menuCards, {
      opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.menu-grid', start: 'top 82%', toggleActions: 'play none none none' }
    });
  }

  /* — Gallery items reveal — */
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    gsap.from(galleryItems, {
      opacity: 0, y: 40, stagger: 0.08, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-track', start: 'top 88%', toggleActions: 'play none none none' }
    });
  }

  /* — Steps stagger — */
  const steps = document.querySelectorAll('.step');
  if (steps.length) {
    gsap.from(steps, {
      opacity: 0, x: -30, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.experience-steps', start: 'top 82%', toggleActions: 'play none none none' }
    });
  }

  /* — Section headers — */
  document.querySelectorAll('.section-header h2, .page-hero h1').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  /* — Reserve kanji scale — */
  const reserveEl = document.querySelector('.reserve');
  if (reserveEl) {
    gsap.from(reserveEl, {
      '--reserve-opacity': 0,
      ease: 'none',
      scrollTrigger: { trigger: reserveEl, start: 'top bottom', end: 'top top', scrub: true }
    });
  }

  /* — Footer brand reveal — */
  gsap.from('.footer-brand', {
    opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: 'footer', start: 'top 90%', toggleActions: 'play none none none' }
  });
}

/* ──────────────────────────────────────
   SCROLL PROGRESS BAR
─────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

/* ──────────────────────────────────────
   NAV SCROLL EFFECT
─────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();

  /* Mobile hamburger */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    if (open) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ──────────────────────────────────────
   CUSTOM CURSOR (desktop only)
─────────────────────────────────────── */
function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  document.body.classList.add('has-custom-cursor');

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.06, ease: 'none' });
  });

  // Ring lags behind — smooth lerp via RAF
  (function tick() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(tick);
  })();

  const interactives = 'a, button, .menu-card, .gallery-item, .job-card';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  document.addEventListener('mousedown',  () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',    () => ring.classList.remove('clicking'));
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));
}

/* ──────────────────────────────────────
   GALLERY — DRAG TO SCROLL
─────────────────────────────────────── */
function initGalleryDrag() {
  const track = document.querySelector('.gallery-track');
  if (!track) return;

  let isDown = false, startX = 0, scrollLeft = 0, moved = false;

  track.addEventListener('mousedown', e => {
    isDown = true;
    moved  = false;
    track.classList.add('is-dragging');
    startX     = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  document.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('is-dragging');
  });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    moved = true;
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    track.scrollLeft = scrollLeft - walk;
  });

  // Prevent click-through when dragging
  track.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', e => { if (moved) e.preventDefault(); });
  });

  // Touch inertia handled by -webkit-overflow-scrolling: touch
}

/* ──────────────────────────────────────
   MARQUEE — pause on hover
─────────────────────────────────────── */
function initMarquee() {
  const section = document.querySelector('.marquee-section');
  const inner   = document.querySelector('.marquee-track');
  if (!section || !inner) return;
  section.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
  section.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
}
