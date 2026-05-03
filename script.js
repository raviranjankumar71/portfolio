// ========== MOBILE MENU TOGGLE ==========
const menuIcon = document.getElementById('menuIcon');
const navlist = document.getElementById('navlist');

if(menuIcon) {
    menuIcon.addEventListener('click', () => {
        navlist.classList.toggle('active');
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

// ========== CLOSE MOBILE MENU WHEN NAV LINK CLICKED ==========
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

// ========== ACTIVE SECTION HIGHLIGHT ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.navlist a');

function updateActiveSection() {
    let current = '';
    const scrollPos = window.scrollY + 120; // Offset for header
    
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

// ========== SMOOTH SCROLLING WITH OFFSET ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if(!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if(targetElement) {
            const offset = 80; // header height offset
            const elementPosition = targetElement.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== HEADER SHRINK ON SCROLL ==========
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

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color: #64ffda;">✓ Message sent successfully! I\'ll get back to you soon.</span>';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ========== HANDLE MISSING IMAGES (PROJECT IMAGES) ==========
const imagesToCheck = document.querySelectorAll('.col img, .edu-img-wrapper img, .about-img img, .home-img img');
imagesToCheck.forEach(img => {
    img.addEventListener('error', function() {
        if(!this.dataset.fallbackSet) {
            this.dataset.fallbackSet = 'true';
            this.style.objectFit = 'cover';
            this.style.backgroundColor = '#0f2f4f';
            // Add a default text/icon for missing images
            if(this.closest('.col')) {
                this.style.padding = '40px 0';
                this.style.textAlign = 'center';
                this.style.fontSize = '3rem';
                this.alt = '📱 Project Image';
            }
        }
    });
});