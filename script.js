/**
 * NOURISH BY TANVI - OFFICIAL JAVASCRIPT
 * Pure Vanilla JavaScript for high performance, zero runtime dependencies,
 * and 100% compatibility with GitHub Pages static hosting.
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & WHATSAPP INTEGRATION
  // ==========================================================================

  const CONFIG = {
    // Official WhatsApp phone number (with country code, no + or spaces)
    WHATSAPP_PHONE: '919667221287',
    
    // Future Payment Gateway URL (e.g. Razorpay / Stripe / Instamojo)
    // When left empty or null, consultation buttons route to WhatsApp
    PAYMENT_URL: null,

    // Pre-filled WhatsApp message templates
    MESSAGES: {
      consultation: "Hi Tanvi! I'd like to book the ₹99 nutrition consultation. Please share the details and payment process.",
      inquiry: "Hi Tanvi! I came across Nourished by Tanvi and would like to know more about your nutrition consultation and services.",
      weightLoss: "Hi Tanvi! I'm interested in personalized nutrition guidance for Weight Loss. Could you share consultation details?",
      thyroid: "Hi Tanvi! I'd like to consult with you regarding Thyroid & Lifestyle Management. Please share consultation details.",
      pcod: "Hi Tanvi! I'd like guidance for PCOD Management and sustainable lifestyle routines. Please share consultation details.",
      diabetes: "Hi Tanvi! I'd like guidance for Diabetes nutrition and lifestyle management. Please share consultation details.",
      final: "Hi Tanvi! I'd like to know more about your nutrition services and would like to book a consultation."
    }
  };

  /**
   * Generates WhatsApp URL with properly encoded message
   * @param {string} message 
   * @returns {string}
   */
  function getWhatsAppUrl(message) {
    const encoded = encodeURIComponent(message || CONFIG.MESSAGES.inquiry);
    return `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encoded}`;
  }

  /**
   * Handles Consultation or WhatsApp action
   * @param {string} type 
   * @param {string} customMsg 
   */
  function handleConsultationAction(type, customMsg) {
    // If a payment gateway is configured in the future, redirect to payment
    if (CONFIG.PAYMENT_URL && type === 'consultation') {
      window.location.href = CONFIG.PAYMENT_URL;
      return;
    }

    const message = customMsg || CONFIG.MESSAGES[type] || CONFIG.MESSAGES.consultation;
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Bind all CTA buttons with data-wa-type or data-action="whatsapp"
  function initWhatsAppButtons() {
    const buttons = document.querySelectorAll('[data-wa-type]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const type = button.getAttribute('data-wa-type') || 'consultation';
        const custom = button.getAttribute('data-wa-custom');
        handleConsultationAction(type, custom);
      });
    });

    // Floating WhatsApp Button
    const floatingBtn = document.getElementById('floatingWhatsAppBtn');
    if (floatingBtn) {
      floatingBtn.href = getWhatsAppUrl(CONFIG.MESSAGES.inquiry);
    }
  }

  // ==========================================================================
  // STICKY HEADER & SCROLL SPY
  // ==========================================================================

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Active navigation link tracking
  function initNavScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
      const scrollPos = window.scrollY + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ==========================================================================
  // MOBILE MENU DRAWER
  // ==========================================================================

  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    if (!toggleBtn || !mobileMenu) return;

    let isOpen = false;

    const openMenu = () => {
      isOpen = true;
      mobileMenu.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    };

    const closeMenu = () => {
      isOpen = false;
      mobileMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    };

    toggleBtn.addEventListener('click', () => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });
  }

  // ==========================================================================
  // FAQ ACCORDION
  // ==========================================================================

  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!questionBtn || !answer) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for clean single-expand behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = '0px';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // ==========================================================================
  // TESTIMONIALS CAROUSEL
  // ==========================================================================

  function initTestimonialCarousel() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || !cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    const getVisibleCount = () => {
      const width = window.innerWidth;
      if (width <= 680) return 1;
      if (width <= 1024) return 2;
      return 3;
    };

    const getMaxIndex = () => {
      const visible = getVisibleCount();
      return Math.max(0, cards.length - visible);
    };

    // Render navigation dots
    const updateDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const max = getMaxIndex();

      for (let i = 0; i <= max; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const updateCarousel = () => {
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const card = cards[0];
      const cardWidth = card.offsetWidth;
      const gap = 24; // matches CSS gap
      const offset = currentIndex * (cardWidth + gap);

      track.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === maxIndex;

      updateDots();
    };

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      const max = getMaxIndex();
      if (currentIndex < max) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeDistance = touchStartX - touchEndX;
      const threshold = 40;

      if (swipeDistance > threshold) {
        // Swipe left -> Next
        const max = getMaxIndex();
        if (currentIndex < max) {
          currentIndex++;
          updateCarousel();
        }
      } else if (swipeDistance < -threshold) {
        // Swipe right -> Prev
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      }
    };

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // ==========================================================================
  // SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================

  function initScrollReveals() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================

  function init() {
    initWhatsAppButtons();
    initHeaderScroll();
    initNavScrollSpy();
    initMobileMenu();
    initFaqAccordion();
    initTestimonialCarousel();
    initScrollReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose helper globally for custom inline triggers if needed
  window.NourishByTanvi = {
    openWhatsApp: handleConsultationAction,
    config: CONFIG
  };
})();
