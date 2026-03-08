document.addEventListener("DOMContentLoaded", () => {

  const stopStealing = () => {
    if (!document.getElementById('protection-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'protection-overlay';
      overlay.style.display = 'flex';
      overlay.innerHTML = '<div>Sorry bruh, you can\'t steal my code.</div>';
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
    }
  };

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I or J
      (e.ctrlKey && e.keyCode === 85)
    ) {
      stopStealing();
      e.preventDefault();
      return false;
    }
  });

  setInterval(() => {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      stopStealing();
    }
  }, 500);
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuLinks = document.querySelectorAll('.menu-link');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow =
      mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.gsap-reveal').forEach(section => {
    gsap.set(section, { autoAlpha: 1 });
    const textSpans = section.querySelectorAll('.split-text span span');
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      onEnter: () => {
        if (textSpans.length) {
          gsap.to(textSpans, {
            y: '0%',
            duration: 0.8,
            stagger: 0.015,
            ease: "power3.out",
            force3D: true
          });
        }
        if (section.classList.contains('cta-btn') || section.classList.contains('about-card')) {
          gsap.fromTo(
            section,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", force3D: true }
          );
        }
      }
    });
  });

  gsap.from('.gsap-stagger', {
    scrollTrigger: {
      trigger: '.works-grid',
      start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    force3D: true
  });

  const logo = document.querySelector(".loading-logo");
  const counter = document.getElementById("counter");
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  logo.classList.add("rotate-logo");
  let value = 0;
  const duration = 3500;
  const intervalTime = duration / 100;

  const counterInterval = setInterval(() => {
    value++;
    counter.innerText = value + "%";
    if (value >= 100) {
      clearInterval(counterInterval);
      revealSite();
    }
  }, intervalTime);

  function revealSite() {
    preloader.style.transform = "translateY(-100%)";
    preloader.style.transition = "transform 3s ease";
    mainContent.style.visibility = "visible";
    mainContent.style.transform = "translateY(150px)";
    mainContent.style.opacity = "0";

    setTimeout(() => {
      mainContent.style.transition = "all 0.9s ease";
      mainContent.style.transform = "translateY(0)";
      mainContent.style.opacity = "1";
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, 100);
  }
});