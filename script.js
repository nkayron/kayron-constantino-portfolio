// script.js
// Comportamento: menu responsivo, alternância claro/escuro e validação do formulário

document.addEventListener('DOMContentLoaded', function () {
  // Atualiza anos nos rodapés automaticamente
  const year = new Date().getFullYear();
  ['year','year-2','year-3','year-4','year-5'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // Menu responsivo: alterna classe open para mostrar/ocultar navegação
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Alternância de tema com persistência em localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');

  function applyInitialTheme() {
    if (stored === 'dark' || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      if (themeToggle) { themeToggle.setAttribute('aria-pressed', 'true'); themeToggle.textContent = '☀️'; }
    } else {
      root.classList.remove('dark');
      if (themeToggle) { themeToggle.setAttribute('aria-pressed', 'false'); themeToggle.textContent = '🌙'; }
    }
  }
  applyInitialTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // Validação do formulário de contato
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.value.trim()) {
        alert('Por favor, informe seu nome.');
        name.focus();
        return;
      }
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        alert('Por favor, informe um e-mail válido (ex: teste@dominio.com).');
        email.focus();
        return;
      }
      if (!message.value.trim()) {
        alert('Por favor, escreva uma mensagem.');
        message.focus();
        return;
      }

      // Limpa campos e mostra confirmação
      name.value = '';
      email.value = '';
      message.value = '';
      alert('Mensagem enviada com sucesso!');
    });
  }

  // Ativa animações de entrada
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});
