/* ═══════════════════════════════════════════════
   THILANKA YASODHANA RATHNAYAKA — Portfolio JS
   ═══════════════════════════════════════════════ */

'use strict';

/* ── 1. THEME (Dark / Light) ── */
const root        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

// Persist preference; default to 'dark'
let currentTheme = localStorage.getItem('tyr-theme') || 'dark';
applyTheme(currentTheme);

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
  currentTheme = theme;
  localStorage.setItem('tyr-theme', theme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}


/* ── 2. MOBILE HAMBURGER MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');

function closeMobileNav() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
}

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  });
}

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (
    mobileNav && mobileNav.classList.contains('open') &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileNav();
  }
});


/* ── 3. SMOOTH SCROLL ── */
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const headerH = parseInt(getComputedStyle(root).getPropertyValue('--header-h')) || 72;
  window.scrollTo({
    top: section.offsetTop - headerH,
    behavior: 'smooth',
  });
}

// All nav links (desktop + mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    scrollToSection(targetId);
    setActiveLink(targetId);
  });
});

// Hero CTA buttons
const getInTouchBtn = document.getElementById('get-in-touch-btn');
const viewProjectsBtn = document.getElementById('view-projects-btn');

getInTouchBtn?.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('contact'); });
viewProjectsBtn?.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('projects'); });


/* ── 4. ACTIVE NAV HIGHLIGHT ON SCROLL ── */
function setActiveLink(id) {
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + id);
  });
}

const sections = Array.from(document.querySelectorAll('section[id]'));

function onScroll() {
  const scrollY = window.scrollY;
  const headerH = parseInt(getComputedStyle(root).getPropertyValue('--header-h')) || 72;

  // Active section
  let current = sections[0]?.id || '';
  for (const sec of sections) {
    if (scrollY >= sec.offsetTop - headerH - 10) current = sec.id;
  }
  setActiveLink(current);

  // Header shadow
  const header = document.getElementById('site-header');
  header?.classList.toggle('scrolled', scrollY > 20);

  // Back to top
  const backBtn = document.getElementById('back-to-top');
  backBtn?.classList.toggle('show', scrollY > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load


/* ── 5. BACK TO TOP ── */
document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── 6. ANIMATED STAT COUNTERS ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;
  const duration = 1800;
  const step = 16;
  const increment = Math.max(1, Math.ceil(target / (duration / step)));
  let current = 0;

  const tick = () => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
    } else {
      el.textContent = current + '+';
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => statObserver.observe(el));


/* ── 7. ANIMATED SKILL BARS (on scroll) ── */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      if (width) bar.style.width = width + '%';
      skillBarObserver.unobserve(bar);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-bar[data-width]').forEach(bar => skillBarObserver.observe(bar));


/* ── 8. CONTACT FORM ── */
const form     = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

if (form && feedback) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    // Basic validation
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill in all fields.';
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    // Simulate submission (replace with fetch() to real endpoint)
    feedback.className = 'form-feedback success';
    feedback.textContent = '✓ Thank you! Your message has been received. I\'ll be in touch soon.';
    form.reset();
  });
}


/* ── 9. FOOTER / MOBILE NAV — smooth scroll for anchor links ── */
document.querySelectorAll('footer a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection(this.getAttribute('href').slice(1));
  });
});
