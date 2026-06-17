/* =================================================================
   AFRICULTURE — AUTH PAGE LOGIC
   Sliding overlay system + validation + GSAP entrance
   ================================================================= */

(() => {
  'use strict';

  const formCard   = document.getElementById('formCard');
  const overlay    = document.getElementById('overlay');
  const loginForm  = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toast      = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastSub   = document.getElementById('toastSubtitle');
  const promoHeading = document.getElementById('promoHeading');
  const promoCopy    = document.getElementById('promoCopy');

  const promoContent = {
    login: {
      heading: 'Join the<br>Movement',
      copy: 'Celebrate African creativity. Connect with stories, art, and culture from a continent of makers, dreamers, and storytellers.'
    },
    register: {
      heading: 'Tell Your<br>Story',
      copy: 'Every voice adds texture to the collective. Create your account and become part of the archive we are building together.'
    }
  };

  /* ---------------------------------------------------------
     MODE SWITCHING
     Toggling .is-register on the card drives every visual
     change via CSS — overlay slide, form crossfade, etc.
     --------------------------------------------------------- */
  let mode = 'login';

  function setMode(next) {
    if (next === mode) return;
    mode = next;

    formCard.classList.toggle('is-register', mode === 'register');

    const copy = promoContent[mode];
    if (promoHeading && promoCopy) {
      gsapFadeSwapText(promoHeading, copy.heading);
      gsapFadeSwapText(promoCopy, copy.copy);
    }

    // Move focus to the first field of the now-visible form for a11y
    const target = mode === 'register' ? '#registerName' : '#loginEmail';
    const field = document.querySelector(target);
    if (field) {
      window.setTimeout(() => field.focus({ preventScroll: true }), 450);
    }
  }

  function gsapFadeSwapText(el, html) {
    if (window.gsap) {
      gsap.to(el, {
        opacity: 0, y: -8, duration: 0.22, ease: 'power1.in',
        onComplete: () => {
          el.innerHTML = html;
          gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' });
        }
      });
    } else {
      el.innerHTML = html;
    }
  }

  document.querySelectorAll('[data-switch]').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.switch));
  });

  /* ---------------------------------------------------------
     PASSWORD VISIBILITY TOGGLE
     --------------------------------------------------------- */
  document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye', !isPassword);
      icon.classList.toggle('fa-eye-slash', isPassword);
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });

  /* ---------------------------------------------------------
     PASSWORD STRENGTH METER (register form)
     --------------------------------------------------------- */
  const registerPassword = document.getElementById('registerPassword');
  const strengthMeter = document.querySelector('[data-strength-meter]');

  function scorePassword(value) {
    let score = 0;
    if (!value) return 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
    return Math.max(score, value.length > 0 ? 1 : 0);
  }

  if (registerPassword && strengthMeter) {
    registerPassword.addEventListener('input', () => {
      const score = scorePassword(registerPassword.value);
      strengthMeter.className = 'strength-meter' + (score ? ` s-${score}` : '');
    });
  }

  /* ---------------------------------------------------------
     VALIDATION
     --------------------------------------------------------- */
  function showError(fieldEl, show) {
    fieldEl.classList.toggle('is-invalid', show);
  }

  function validateField(fieldEl) {
    const input = fieldEl.querySelector('input');
    if (!input) return true;

    let valid = input.checkValidity();

    // Custom rule: confirm-password match
    if (input.id === 'registerConfirm') {
      const pass = document.getElementById('registerPassword');
      valid = valid && input.value === pass.value && input.value.length > 0;
    }

    showError(fieldEl, !valid);
    return valid;
  }

  function wireLiveValidation(form) {
    form.querySelectorAll('[data-field]').forEach((fieldEl) => {
      const input = fieldEl.querySelector('input');
      if (!input) return;
      input.addEventListener('blur', () => validateField(fieldEl));
      input.addEventListener('input', () => {
        if (fieldEl.classList.contains('is-invalid')) validateField(fieldEl);
      });
    });
  }

  wireLiveValidation(loginForm);
  wireLiveValidation(registerForm);

  // re-check confirm-password live as the primary password changes
  if (registerPassword) {
    registerPassword.addEventListener('input', () => {
      const confirmField = document.getElementById('registerConfirm')?.closest('[data-field]');
      if (confirmField && confirmField.classList.contains('is-invalid')) {
        validateField(confirmField);
      }
    });
  }

  /* ---------------------------------------------------------
     SUBMIT HANDLING (mock — replace with real API calls)
     --------------------------------------------------------- */
  function handleSubmit(form, { successTitle, successSub, redirect }) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = Array.from(form.querySelectorAll('[data-field]'));
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        const firstInvalid = fields.find((f) => f.classList.contains('is-invalid'));
        firstInvalid?.querySelector('input')?.focus();
        if (window.gsap) {
          gsap.fromTo(form, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        }
        return;
      }

      const submitBtn = form.querySelector('.btn--primary');
      submitBtn.classList.add('is-loading');

      // Simulated network delay — swap for a real fetch() to your backend
      window.setTimeout(() => {
        submitBtn.classList.remove('is-loading');
        showToast(successTitle, successSub);
        form.reset();
        if (strengthMeter) strengthMeter.className = 'strength-meter';
        if (redirect) {
          window.setTimeout(() => { window.location.href = redirect; }, 1400);
        }
      }, 1100);
    });
  }

  handleSubmit(loginForm, {
    successTitle: 'Welcome back',
    successSub: "You're signed in. Redirecting…",
    redirect: null // e.g. 'index.html'
  });

  handleSubmit(registerForm, {
    successTitle: 'Account created',
    successSub: 'Welcome to the collective.',
    redirect: null
  });

  /* ---------------------------------------------------------
     TOAST
     --------------------------------------------------------- */
  let toastTimer = null;
  function showToast(title, sub) {
    toastTitle.textContent = title;
    toastSub.textContent = sub;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3600);
  }

  /* ---------------------------------------------------------
     ENTRANCE ANIMATION (GSAP)
     Cinematic, restrained — fits AFRICULTURE's motion language
     --------------------------------------------------------- */
  function playEntrance() {
    if (!window.gsap) return;

    gsap.set(['.promo-panel', '.form-panel'], { opacity: 0 });
    gsap.set('.promo-panel', { x: -28 });
    gsap.set('.form-panel', { x: 28 });
    gsap.set('.brand-mark', { opacity: 0, y: -10 });
    gsap.set(['.promo-eyebrow', '.promo-heading', '.promo-copy', '.promo-stats'], { opacity: 0, y: 18 });
    gsap.set('#loginFace .form-kicker, #loginFace .form-title, #loginFace .form-subtitle', { opacity: 0, y: 14 });
    gsap.set('#loginFace .field', { opacity: 0, y: 14 });
    gsap.set('#loginFace .form-row, #loginFace .btn--primary, #loginFace .divider, #loginFace .social-row', { opacity: 0, y: 14 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.brand-mark', { opacity: 1, y: 0, duration: 0.6 }, 0)
      .to('.promo-panel', { opacity: 1, x: 0, duration: 0.9, ease: 'power4.out' }, 0.1)
      .to('.form-panel', { opacity: 1, x: 0, duration: 0.9, ease: 'power4.out' }, 0.15)
      .to('.promo-eyebrow', { opacity: 1, y: 0, duration: 0.5 }, 0.45)
      .to('.promo-heading', { opacity: 1, y: 0, duration: 0.6 }, 0.52)
      .to('.promo-copy', { opacity: 1, y: 0, duration: 0.55 }, 0.6)
      .to('.promo-stats', { opacity: 1, y: 0, duration: 0.55 }, 0.68)
      .to('#loginFace .form-kicker, #loginFace .form-title, #loginFace .form-subtitle',
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 }, 0.5)
      .to('#loginFace .field', { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.62)
      .to('#loginFace .form-row, #loginFace .btn--primary, #loginFace .divider, #loginFace .social-row',
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.82);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    requestAnimationFrame(playEntrance);
  } else {
    document.addEventListener('DOMContentLoaded', playEntrance);
  }
})();