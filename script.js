// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// Scroll to section
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Button functionality
const getInTouchBtn = document.getElementById('get-in-touch-btn');
const viewProjectsBtn = document.getElementById('view-projects-btn');

if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('contact');
    });
}

if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('projects');
    });
}

// Nav link smooth scroll + active state
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);

        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');

        if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});

// Active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backBtn = document.getElementById('back-to-top');
    if (backBtn) {
        if (window.scrollY > 300) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    }
});

// Stats animation
const stats = document.querySelectorAll('.stat-number');
const statValues = [8, 100, 15];

if (stats.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const index = Array.from(stats).indexOf(target);
                const end = statValues[index];
                let current = 0;
                const duration = 2000;
                const step = Math.ceil(end / (duration / 16));

                const animate = () => {
                    current += step;
                    if (current > end) {
                        target.textContent = end + '+';
                        observer.unobserve(target);
                    } else {
                        target.textContent = current + '+';
                        requestAnimationFrame(animate);
                    }
                };
                animate();
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Form handling
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! This is a demo form.');
        form.reset();
    });
}

// Back to top
const backTop = document.getElementById('back-to-top');
if (backTop) {
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

}
