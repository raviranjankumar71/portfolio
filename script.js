// Mobile menu toggle functionality
const menuIcon = document.getElementById('menuIcon');
const navlist = document.getElementById('navlist');

if(menuIcon) {
    menuIcon.addEventListener('click', () => {
        navlist.classList.toggle('active');
        // change icon style (optional)
        const icon = menuIcon.querySelector('i');
        if(navlist.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });
}

// Close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.navlist a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navlist.classList.remove('active');
        const icon = menuIcon?.querySelector('i');
        if(icon) {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });
});

// Download CV simulation (smooth & interactive)
const downloadBtn = document.getElementById('downloadBtn');
if(downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Create dummy CV download (simulates resume)
        const link = document.createElement('a');
        link.href = '#'; 
        link.download = 'Raviranjan_Kumar_Flutter_CV.pdf';
        // Alert with nice feedback (since no actual file, show toast-like)
        alert('📄 Demo: Your CV download would start here. In production, link actual PDF.');
        
        // Or you can trigger a fake behaviour
        // For actual CV you can link a real resource. Provide a nice ui feedback
        const btn = e.currentTarget;
        btn.textContent = '✨ Request Sent';
        setTimeout(() => {
            btn.textContent = 'Download CV';
        }, 1500);
    });
}

// Smooth scrolling for all anchor links + active highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.navlist a');

function updateActiveSection() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if(href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if(!targetId) return;
        const targetElement = document.getElementById(targetId);
        if(targetElement) {
            const offset = 90;  // header height offset
            const elementPosition = targetElement.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// handle placeholder for missing images (ensure project images look consistent)
const imagesToCheck = document.querySelectorAll('.col img');
imagesToCheck.forEach(img => {
    img.addEventListener('error', function() {
        if(!this.dataset.fallbackSet) {
            this.dataset.fallbackSet = 'true';
            // already handled via inline onerror but we can also force by style, keep placeholder text
            this.style.objectFit = 'cover';
            this.style.backgroundColor = '#0f2f4f';
        }
    });
});


// responsive header shrink on scroll (optional little effect)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 60) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        header.style.padding = '10px 28px';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.96)';
        header.style.padding = '14px 28px';
    }
});