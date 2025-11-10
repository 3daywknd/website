/**
 * Three Day Weekend - Main JavaScript
 * Scroll animations, interactions, and UI enhancements
 */

// ============================================
// Utility Functions
// ============================================

const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
};

const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// ============================================
// Smooth Scroll
// ============================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for nav height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// Scroll Reveal
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.observer = null;
        this.init();
    }

    init() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optionally unobserve after revealing
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(el => this.observer.observe(el));
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// ============================================
// Number Counter Animation
// ============================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-target]');
        this.animated = new Set();
        this.init();
    }

    init() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, options);

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
}

// ============================================
// Sticky Navigation
// ============================================

class StickyNav {
    constructor() {
        this.nav = document.getElementById('nav');
        this.scrollThreshold = 100;
        this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > this.scrollThreshold) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        }, 100));
    }
}

// ============================================
// Parallax Effect
// ============================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.parallax');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', throttle(() => {
            this.elements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(window.scrollY * speed);
                element.style.setProperty('--parallax-offset', `${yPos}px`);
            });
        }, 16));
    }
}

// ============================================
// Button Ripple Effect
// ============================================

class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// ============================================
// Card Tilt Effect
// ============================================

class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 10;
                const rotateY = ((x - centerX) / centerX) * -10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ============================================
// Scroll Progress Indicator
// ============================================

class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #024F4F 0%, #00BFFF 100%);
            z-index: 9999;
            transform-origin: left;
            transform: scaleX(0);
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    init() {
        window.addEventListener('scroll', throttle(() => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            this.progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        }, 16));
    }
}

// ============================================
// Lazy Load Images
// ============================================

class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.images.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
        }
    }
}

// ============================================
// Cursor Effect (Optional)
// ============================================

class CustomCursor {
    constructor() {
        if (window.innerWidth < 1024) return; // Only on desktop

        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid #024F4F;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(this.cursor);
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = `${e.clientX - 10}px`;
            this.cursor.style.top = `${e.clientY - 10}px`;
            this.cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// ============================================
// Page Load Animation
// ============================================

class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Fade out loader if exists
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        });
    }
}

// ============================================
// Initialize All Components
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new SmoothScroll();
    new ScrollReveal();
    new CounterAnimation();
    new StickyNav();
    new LazyLoadImages();
    new PageLoader();

    // Enhanced interactions
    new RippleEffect();
    new CardTilt();
    new ScrollProgress();
    new ParallaxEffect();

    // Optional: Custom cursor (desktop only)
    // Uncomment to enable:
    // new CustomCursor();

    // Console message
    console.log('%c🌲 Three Day Weekend ', 'background: #024F4F; color: #fff; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: bold;');
    console.log('Automation for the Modern Tree Care Industry');
});

// ============================================
// Handle Resize
// ============================================

window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('is-mobile', isMobile);
}, 250));

// ============================================
// Performance Optimization
// ============================================

// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.classList.add('reduced-motion');
}
