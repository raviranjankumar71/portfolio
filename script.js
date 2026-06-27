/* ============================================================
   DOM REFERENCES
   ============================================================ */
const menuButton = document.getElementById('menuIcon');
const navList = document.getElementById('navlist');
const header = document.getElementById('siteHeader');
const navLinks = document.querySelectorAll('.navlist a');
const sections = document.querySelectorAll('main section[id]');
const typingElement = document.querySelector('.typing-text');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');


/* ============================================================
   TYPING ANIMATION
   ============================================================ */
const roles = [
    'Flutter Developer',
   
    'Mobile App Developer',
    'Clean Architecture Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

/**
 * Typewriter effect for the hero role text
 * Cycles through roles array with typing and deleting animation
 */
function typeRole() {
    if (!typingElement) return;

    const role = roles[roleIndex];
    typingElement.textContent = role.slice(0, charIndex);

    // Typing forward
    if (!deleting && charIndex < role.length) {
        charIndex++;
        setTimeout(typeRole, 85);
        return;
    }

    // Pause at full word
    if (!deleting && charIndex === role.length) {
        deleting = true;
        setTimeout(typeRole, 1400);
        return;
    }

    // Deleting backward
    if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeRole, 45);
        return;
    }

    // Move to next role
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 360);
}

// Start the typing animation
typeRole();


/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
/**
 * Toggle mobile menu open/closed state
 * @param {boolean} open - Whether the menu should be open
 */
function setMenuOpen(open) {
    if (!menuButton || !navList) return;

    navList.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));

    const icon = menuButton.querySelector('i');
    icon.classList.toggle('bx-menu', !open);
    icon.classList.toggle('bx-x', open);
}

// Toggle menu on button click
menuButton?.addEventListener('click', () => {
    setMenuOpen(!navList.classList.contains('active'));
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});


/* ============================================================
   SMOOTH SCROLL WITH OFFSET
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();

        // Calculate offset for fixed header
        const offset = header ? header.offsetHeight + 24 : 96;

        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
        });
    });
});


/* ============================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
   ============================================================ */
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        });
    }, {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
    }
);

sections.forEach(section => sectionObserver.observe(section));


/* ============================================================
   REVEAL ANIMATIONS ON SCROLL
   ============================================================ */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16
    }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */
/**
 * Add/remove scrolled class on header based on scroll position
 */
function updateHeader() {
    header?.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();


/* ============================================================
   CONTACT FORM HANDLING
   ============================================================ */
/**
 * Handle contact form submission
 * Opens mail client with pre-filled message
 */
contactForm?.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get('subject') || 'Flutter Developer Opportunity');
    const body = encodeURIComponent(
        'Hi Raviranjan,\n\n' +
        data.get('message') +
        '\n\nFrom: ' + data.get('name') +
        '\nEmail: ' + data.get('email')
    );

    formStatus.textContent = 'Opening your email app with the message ready to send.';

    // Open default email client with pre-filled fields
    window.location.href = 'mailto:raviranjankumar0917@gmail.com?subject=' + subject + '&body=' + body;

    // Reset form after submission
    contactForm.reset();
});


/* ============================================================
   KEYBOARD NAVIGATION (Accessibility)
   ============================================================ */
// Close mobile menu on Escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navList?.classList.contains('active')) {
        setMenuOpen(false);
        menuButton?.focus();
    }
});

// Trap focus within mobile menu when open
menuButton?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setMenuOpen(!navList.classList.contains('active'));
    }
});


/* ============================================================
   PERFORMANCE OPTIMIZATIONS
   ============================================================ */
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Any heavy scroll operations can go here
    }, 100);
}, { passive: true });


/* ============================================================
   CONSOLE WELCOME (Developer Friendly)
   ============================================================ */
console.log(
    '%c🚀 Raviranjan Kumar Portfolio',
    'font-size: 20px; font-weight: bold; color: #29d3c2;'
);
console.log(
    '%cBuilt with ❤️ using vanilla JS',
    'font-size: 12px; color: #a7b4c7;'
);
console.log(
    '%c📧 raviranjankumar0917@gmail.com',
    'font-size: 12px; color: #ffb454;'
);