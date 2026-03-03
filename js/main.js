document.addEventListener('DOMContentLoaded', () => {

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initHeader();
    initHeroAnimations();
    initCounterAnimation();
    initScrollReveals();
});

// Sticky Header Logic
function initHeader() {
    const header = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic implementation, will enhance)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // we will build a full screen mobile menu later
            console.log("Toggle mobile menu");
        });
    }
}

// Hero Entrance Animations
function initHeroAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');

    fadeElements.forEach(el => {
        const delay = el.style.getPropertyValue('--delay') || 0;

        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: parseFloat(delay),
            ease: "power3.out"
        });
    });
}

// Animated Stats Counter
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2; // seconds

        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%", // when top of element hits 85% of viewport
            onEnter: () => {
                let startValue = 0;
                // Animate value based on GSAP object tween
                gsap.to({ value: startValue }, {
                    value: target,
                    duration: duration,
                    ease: "power2.out",
                    onUpdate: function () {
                        stat.innerText = Math.floor(this.targets()[0].value);
                    }
                });
            },
            once: true // only animate once
        });
    });
}

// Scroll Reveal Animations
function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(el => {
        const delay = el.style.getPropertyValue('--delay') || 0;

        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: parseFloat(delay),
                    ease: "power3.out"
                });
            },
            once: true
        });
    });
}
