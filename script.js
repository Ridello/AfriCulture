/* =========================
        GSAP PLUGIN
========================= */

gsap.registerPlugin(ScrollTrigger);

/* =========================
        SWIPER
========================= */

const swiper = new Swiper('.swiper', {

    loop: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    speed: 1200,
});

/* =========================
        HERO ANIMATION
========================= */

function animateSlide(){

    /* CLEAR OLD ANIMATIONS */
    gsap.killTweensOf(".swiper-slide-active h1");
    gsap.killTweensOf(".swiper-slide-active p");
    gsap.killTweensOf(".swiper-slide-active .hero-btns");
    gsap.killTweensOf(".swiper-slide-active img");

    /* IMAGE FLOAT */
    gsap.fromTo(
        ".swiper-slide-active img",
        {
            scale: 1.2,
            opacity: 0
        },
        {
            scale: 1.05,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out"
        }
    );

    /* TITLE */
    gsap.fromTo(
        ".swiper-slide-active h1",
        {
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        }
    );

    /* PARAGRAPH */
    gsap.fromTo(
        ".swiper-slide-active p",
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: "power3.out"
        }
    );

    /* BUTTONS */
    gsap.fromTo(
        ".hero-btns",
        {
            y: 40,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        }
    );
}

/* RUN ON LOAD */
animateSlide();

/* RUN ON SLIDE CHANGE */
swiper.on('slideChangeTransitionStart', () => {
    animateSlide();
});

/* =========================
        NAVBAR FLOAT
========================= */

gsap.from(".navbar",{
    y: -100,
    opacity: 0,
    duration: 1.3,
    ease: "power3.out"
});

/* =========================
        ABOUT IMAGE PARALLAX
========================= */

gsap.fromTo(
    ".about-image img",
    {
        y: 120,
        scale: 1.2
    },
    {
        y: -50,
        scale: 1,

        ease: "none",

        scrollTrigger:{
            trigger: ".about-section",
            start: "top bottom",
            end: "bottom top",

            scrub: 1
        }
    }
);

/* =========================
        ABOUT TEXT
========================= */

gsap.fromTo(
    ".about-text",
    {
        y: 100,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        duration: 1.5,

        scrollTrigger:{
            trigger: ".about-text",
            start: "top 85%",
            end: "top 40%",

            scrub: 1
        }
    }
);

/* =========================
        SECTION TAG
========================= */

gsap.fromTo(
    ".section-tag",
    {
        x: -80,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,

        scrollTrigger:{
            trigger: ".section-tag",
            start: "top 90%",
            end: "top 50%",

            scrub: 1
        }
    }
);

/* =========================
        VALUE CARDS
========================= */

gsap.fromTo(
    ".value-card",
    {
        y: 120,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        stagger: 0.2,

        scrollTrigger:{
            trigger: ".values-section",
            start: "top 85%",
            end: "top 30%",

            scrub: 1
        }
    }
);

/* =========================
        BUTTON FLOAT
========================= */

gsap.fromTo(
    ".hero-btns button",
    {
        y: 50,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        stagger: 0.15,

        scrollTrigger:{
            trigger: ".hero-btns",
            start: "top 90%",
            end: "top 50%",

            scrub: 1
        }
    }
);
gsap.fromTo(
    ".quote-section h2",
    {
        y: 50,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        stagger: 0.15,

        scrollTrigger:{
            trigger: ".quote-section",
            start: "top 90%",
            end: "top 50%",

            scrub: 1
        }
    }
);
gsap.fromTo(
    ".community-text",
    {
        y: 50,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        stagger: 0.15,

        scrollTrigger:{
            trigger: ".community-text",
            start: "top 90%",
            end: "top 50%",

            scrub: 1
        }
    }
);
gsap.fromTo(
    ".community-stats",
    {
        y: 50,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        stagger: 0.15,

        scrollTrigger:{
            trigger: ".community-stats",
            start: "top 90%",
            end: "top 50%",

            scrub: 1
        }
    }
);
gsap.fromTo(
    ".about-cta",
    {
        y: 50,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,

        stagger: 0.15,

        scrollTrigger:{
            trigger: ".about-cta",
            start: "top 90%",
            end: "top 50%",

            scrub: 1
        }
    }
);

/* =========================
        BLUR GLOW MOTION
========================= */

gsap.to(".blur-1",{
    y: -120,

    scrollTrigger:{
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",

        scrub: true
    }
});

gsap.to(".blur-2",{
    y: 120,

    scrollTrigger:{
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",

        scrub: true
    }
});

/* =========================
        SMOOTH SCROLL
========================= */

document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            const targetPosition =
                targetElement.getBoundingClientRect().top + window.scrollY;

            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;

            let startTime = null;

            const duration = 1400;

            function easeInOutCubic(t, b, c, d) {

                t /= d / 2;

                if (t < 1)
                    return c / 2 * t * t * t + b;

                t -= 2;

                return c / 2 * (t * t * t + 2) + b;
            }

            function animation(currentTime) {

                if (startTime === null)
                    startTime = currentTime;

                const timeElapsed = currentTime - startTime;

                const run = easeInOutCubic(
                    timeElapsed,
                    startPosition,
                    distance,
                    duration
                );

                window.scrollTo(0, run);

                if (timeElapsed < duration)
                    requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        }
    });
});


/* =========================
        MOBILE MENU
========================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const mobileMenu =
    document.querySelector(".mobile-menu");

/* TOGGLE MENU */

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    mobileMenu.classList.toggle("active");
});

/* CLOSE MENU WHEN LINK CLICKED */

document.querySelectorAll(".mobile-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuToggle.classList.remove("active");
    });
});
