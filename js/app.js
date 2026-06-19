/**
 * Вечно худеющий — site interactions & PWA
 */
(function () {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const installBtn = document.getElementById('installBtn');
  const installBanner = document.getElementById('installBanner');
  const installBannerBtn = document.getElementById('installBannerBtn');
  const installDismiss = document.getElementById('installDismiss');

  let deferredPrompt = null;

  /* Sticky header */
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  menuToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', !!open);
    menuToggle.setAttribute('aria-expanded', String(!!open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Открыть меню');
    });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* PWA install */
  const showInstallUi = () => {
    if (installBtn) installBtn.hidden = false;
    if (installBanner && !sessionStorage.getItem('install-dismissed')) {
      installBanner.hidden = false;
      requestAnimationFrame(() => installBanner.classList.add('is-visible'));
    }
  };

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallUi();
  });

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBanner?.classList.remove('is-visible');
    if (installBanner) installBanner.hidden = true;
    if (installBtn) installBtn.hidden = true;
  };

  installBtn?.addEventListener('click', triggerInstall);
  installBannerBtn?.addEventListener('click', triggerInstall);

  installDismiss?.addEventListener('click', () => {
    sessionStorage.setItem('install-dismissed', '1');
    installBanner?.classList.remove('is-visible');
    if (installBanner) installBanner.hidden = true;
  });

  /* Service worker */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(console.error);
    });
  }
})();
