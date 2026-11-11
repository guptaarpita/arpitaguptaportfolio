/* =============================================
   SCRIPT.JS — Portfolio Interactions
   ============================================= */

// ---- NAV: scroll effect + active link ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav__links a:not(.nav__cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // active section highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-link');
    }
  });
});

// ---- MOBILE NAV ----
const burger = document.getElementById('burger');
let mobileMenu = null;

burger.addEventListener('click', () => {
  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav__mobile-menu';
    mobileMenu.innerHTML = `
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#achievements">Achievements</a>
      <a href="#contact" style="color:var(--accent);font-weight:700;">Let's Talk ↗</a>
    `;
    document.body.appendChild(mobileMenu);
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  }
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.about__left, .about__right, .metric-col, .timeline__item, .project-card, .achievement-card, .toolkit__row, .contact__box, .contact__heading, .contact__sub'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---- SMOOTH HOVER TILT on project cards (subtle 3D) ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
  });
});

// ---- CURSOR GLOW (desktop only) ----
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(61,255,160,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateGlow = () => {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}

// ---- LATEST BUILD card — subtle shimmer on load ----
const latestBuild = document.querySelector('.latest-build__name');
if (latestBuild) {
  latestBuild.style.opacity = '0';
  latestBuild.style.transform = 'translateY(6px)';
  latestBuild.style.transition = 'opacity 0.6s ease 1.4s, transform 0.6s ease 1.4s';
  setTimeout(() => {
    latestBuild.style.opacity = '1';
    latestBuild.style.transform = 'translateY(0)';
  }, 100);
}
