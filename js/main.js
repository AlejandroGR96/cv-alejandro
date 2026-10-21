const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const progressBar = $('#progressBar');
const cursorGlow = $('#cursorGlow');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrollTop / height) * 100}%`;
});

window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
$$('#mainNav a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));

const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('cv-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☼';

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const light = document.body.classList.contains('light');
  localStorage.setItem('cv-theme', light ? 'light' : 'dark');
  themeToggle.textContent = light ? '☾' : '☼';
});

const roles = ['creativo.', 'curioso.', 'apasionado.', 'en constante aprendizaje.'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typed = $('#typedText');

function typeEffect() {
  const current = roles[roleIndex];
  typed.textContent = deleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  if (!deleting && charIndex > current.length) {
    deleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, deleting ? 55 : 95);
}
typeEffect();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

$$('.reveal').forEach(el => observer.observe(el));

$$('.filter').forEach(button => {
  button.addEventListener('click', () => {
    $$('.filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

$$('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});
