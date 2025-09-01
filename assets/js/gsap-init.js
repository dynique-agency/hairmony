(function () {
  function animate() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // ---------- Generic reveal ----------
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Hero portrait parallax + microfloat ----------
    const pic = document.querySelector('.portrait-img');
    if (pic) {
      if (!prefersReduced) {
        gsap.to(pic, { y: -6, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.portrait-wrap', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.5 }
        });
      } else {
        gsap.set(pic, { y: 0 });
      }
    }

    // ---------- Gold shimmer effect ----------
    if (!prefersReduced) {
      const hero = document.querySelector('.hero-bg');
      if (hero) {
        const shimmer = document.createElement('div');
        shimmer.setAttribute('aria-hidden', 'true');
        shimmer.style.position = 'absolute';
        shimmer.style.inset = '0';
        shimmer.style.pointerEvents = 'none';
        shimmer.style.background =
          'linear-gradient(120deg, transparent, rgba(232,211,160,.12), transparent)';
        shimmer.style.mixBlendMode = 'screen';
        hero.appendChild(shimmer);

        gsap.fromTo(
          shimmer,
          { xPercent: -120 },
          {
            xPercent: 120,
            duration: 6,
            repeat: -1,
            ease: 'sine.inOut',
            yoyo: true
          }
        );
      }
    }

    // ---------- Magnetic hover CTA ----------
    const btn = document.querySelector('.cta-btn');
    if (btn && !prefersReduced) {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.08;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.08;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.4 })
      );
    }

    // ---------- Portfolio Lightbox ----------
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    if (portfolioItems.length) {
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.style.position = 'fixed';
      lightbox.style.inset = '0';
      lightbox.style.background = 'rgba(0,0,0,0.9)';
      lightbox.style.display = 'flex';
      lightbox.style.alignItems = 'center';
      lightbox.style.justifyContent = 'center';
      lightbox.style.opacity = '0';
      lightbox.style.pointerEvents = 'none';
      lightbox.style.transition = 'opacity .3s ease';
      document.body.appendChild(lightbox);

      const img = document.createElement('img');
      img.style.maxWidth = '90%';
      img.style.maxHeight = '90%';
      img.style.borderRadius = '12px';
      img.style.boxShadow = '0 20px 60px rgba(0,0,0,.6)';
      lightbox.appendChild(img);

      lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
      });

      portfolioItems.forEach((item) => {
        item.addEventListener('click', () => {
          img.src = item.src;
          lightbox.style.opacity = '1';
          lightbox.style.pointerEvents = 'auto';
        });
      });
    }
  }

  // init after load
  window.addEventListener('load', animate);
})();
