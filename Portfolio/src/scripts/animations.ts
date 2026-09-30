import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initAnimations() {
  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Add 'js' class to html element for progressive enhancement
  document.documentElement.classList.add('js');

  if (prefersReducedMotion) {
    // Reveal all elements immediately
    gsap.set('.line-content, .reveal-fade, .section-title-underline', {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      yPercent: 0,
      scaleX: 1
    });
    return;
  }

  // 1. Initialize Lenis Smooth Scroll
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 2. Smooth Scroll for Nav Links
  setupNavScroll();

  // 3. Top Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

  // 4. Header Auto-Hide on Scroll Down / Reappear on Scroll Up
  setupHeaderHide();

  // 5. Hero Intro Sequence (Played Once Per Session)
  setupHeroIntro();

  // 6. Section Scroll Reveals & Line Masking
  setupScrollReveals();

  // 7. Project Image Parallax
  setupProjectParallax();

  // 8. Custom "View" Cursor on Desktop
  setupCustomCursor();

  // 9. Experience Timeline Drawing & Nodes
  setupTimelineAnimation();

  // 10. Number Counter Animations
  setupMetricCounters();

  // 11. Magnetic Buttons (Desktop > 768px)
  setupMagneticButtons();
}

/** 
 * Smooth scrolling to anchor targets using Lenis
 */
function setupNavScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl && lenisInstance) {
          e.preventDefault();
          lenisInstance.scrollTo(targetEl, {
            offset: -80,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    });
  });
}

/** 
 * Auto-hide header when scrolling down past threshold, reappear on scroll up
 */
function setupHeaderHide() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      const currentScrollY = self.scroll();
      if (currentScrollY > 120) {
        if (self.direction === 1) {
          // Scrolling down -> hide header
          header.classList.add('is-hidden');
        } else if (self.direction === -1) {
          // Scrolling up -> show header
          header.classList.remove('is-hidden');
        }
      } else {
        header.classList.remove('is-hidden');
      }
      lastScrollY = currentScrollY;
    }
  });
}

/** 
 * Hero Line-by-Line Clip Reveal Intro (1.2s sequence, once per session)
 */
function setupHeroIntro() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const introPlayed = sessionStorage.getItem('introPlayed');
  const heroLines = heroSection.querySelectorAll('.hero-title-line .line-content');
  const heroRole = heroSection.querySelectorAll('.hero-role .line-content');
  const heroIntroText = heroSection.querySelector('.hero-intro');
  const heroActions = heroSection.querySelector('.hero-actions');
  const availabilityBadge = heroSection.querySelector('.availability-wrapper');

  if (!introPlayed) {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introPlayed', 'true');
      }
    });

    if (availabilityBadge) {
      tl.from(availabilityBadge, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' });
    }

    if (heroLines.length > 0) {
      tl.from(heroLines, {
        yPercent: 100,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12
      }, '-=0.3');
    }

    if (heroRole.length > 0) {
      tl.from(heroRole, {
        yPercent: 100,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.5');
    }

    if (heroIntroText) {
      tl.from(heroIntroText, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.4');
    }

    if (heroActions) {
      tl.from(heroActions.children, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.1
      }, '-=0.4');
    }
  } else {
    // If intro already played, set final states cleanly
    gsap.set([heroLines, heroRole], { yPercent: 0 });
    gsap.set([heroIntroText, heroActions, availabilityBadge], { opacity: 1, y: 0 });
  }
}

/** 
 * Section masked heading line reveals & element stagger fades
 */
function setupScrollReveals() {
  const sections = document.querySelectorAll('.section');

  sections.forEach((section) => {
    const titleLines = section.querySelectorAll('.section-title-line .line-content');
    const underline = section.querySelector('.section-title-underline');
    const fadeElements = section.querySelectorAll('.reveal-fade');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        once: true
      }
    });

    if (titleLines.length > 0) {
      tl.from(titleLines, {
        yPercent: 100,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    }

    if (underline) {
      tl.fromTo(underline, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 
        '-=0.5'
      );
    }

    if (fadeElements.length > 0) {
      tl.from(fadeElements, {
        opacity: 0,
        y: 24,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.08
      }, '-=0.4');
    }
  });
}

/** 
 * Parallax effect for project card preview images
 */
function setupProjectParallax() {
  const projectCards = document.querySelectorAll('.featured-card');

  projectCards.forEach((card) => {
    const image = card.querySelector('.featured-img');
    if (image) {
      gsap.to(image, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });
}

/** 
 * Custom "View" cursor following mouse on project card hover (desktop only)
 */
function setupCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.innerWidth <= 768) return;

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const cursorTargets = document.querySelectorAll('[data-cursor="view"]');
  cursorTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('is-active');
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
    });
  });
}

/** 
 * Experience timeline line drawing down & node scaling
 */
function setupTimelineAnimation() {
  const timelineContainer = document.querySelector('.timeline');
  const lineProgress = document.querySelector('.timeline-line-progress');
  const timelineNodes = document.querySelectorAll('.timeline-item');

  if (timelineContainer && lineProgress) {
    gsap.fromTo(lineProgress, 
      { scaleY: 0 }, 
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer,
          start: 'top 75%',
          end: 'bottom 75%',
          scrub: true
        }
      }
    );
  }

  timelineNodes.forEach((node) => {
    const dot = node.querySelector('.timeline-node-dot');
    if (dot) {
      gsap.from(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: node,
          start: 'top 80%',
          once: true
        }
      });
    }
  });
}

/** 
 * Metric Counter Numbers Animation
 */
function setupMetricCounters() {
  const counterEls = document.querySelectorAll('[data-counter]');

  counterEls.forEach((el) => {
    const targetVal = parseInt(el.getAttribute('data-counter') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';

    const obj = { val: 0 };

    gsap.to(obj, {
      val: targetVal,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      onUpdate: () => {
        el.textContent = `${Math.floor(obj.val)}${suffix}`;
      }
    });
  });
}

/** 
 * Magnetic Effect on Main Buttons (Desktop Only)
 */
function setupMagneticButtons() {
  if (window.innerWidth <= 768) return;

  const magneticBtns = document.querySelectorAll('.btn-magnetic');

  magneticBtns.forEach((btn) => {
    const htmlBtn = btn as HTMLElement;
    const xTo = gsap.quickTo(htmlBtn, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(htmlBtn, 'y', { duration: 0.3, ease: 'power3.out' });

    htmlBtn.addEventListener('mousemove', (e) => {
      const rect = htmlBtn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      xTo(relX * 0.35);
      yTo(relY * 0.35);
    });

    htmlBtn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/** 
 * Clean up GSAP and Lenis instances for page teardown
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
