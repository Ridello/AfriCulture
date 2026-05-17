// 1. Initialize Swiper Slider (Only Once!)
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    }
});

// 2. GSAP Text Animation Logic
function animateSlide() {
    gsap.fromTo(".swiper-slide-active h1", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });

    gsap.fromTo(".swiper-slide-active p", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });
}

// Run GSAP animations on page load
animateSlide();
// Re-run animations whenever the user transitions slides
swiper.on('slideChange', () => {
    animateSlide();
});

// 3. Ultra-Smooth Easing Physics Scroll Engine
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Calculates destination minus the 80px fixed navbar buffer
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime = null;

      const duration = 1200; // Duration of glide (1.2 seconds)

      // Mathematical Easing Function (Slow deceleration break)
      function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      requestAnimationFrame(animation);
    }
  });
});
