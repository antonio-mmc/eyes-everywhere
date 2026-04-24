/* ================================================
   EyesEveryWhere — FrontOffice Main Script
   ================================================ */

// --------------- Sidebar Toggle ---------------
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  document.body.classList.toggle('sidebar-open');
});

// --------------- Main Initialisation ---------------
document.addEventListener('DOMContentLoaded', () => {
  initMockData();
  initAuth();
  initNavbarScroll();
  initModals();
  initNotifications();
  initContactForm();
  initScrollReveal();
});

/* ================================================
   MOCK DATA INITIALIZATION
   ================================================ */
function initMockData() {
  // We no longer force a mock user into storage automatically to respect session expiration
  // Users must login via the login page

  // Inject mock occurrences
  if (!localStorage.getItem('ocorrencias') || JSON.parse(localStorage.getItem('ocorrencias')).length === 0) {
    const mockOcorrencias = [
      { id: "1", userid: "1", tipo: "Buraco na estrada", estado: "Em curso", descricao: "Buraco profundo na via principal que pode causar acidentes.", localizacao: "Avenida da Liberdade, Braga", data: new Date().toISOString() },
      { id: "2", userid: "1", tipo: "Iluminação pública", estado: "Resolvido", descricao: "Poste de luz intermitente há vários dias.", localizacao: "Rua do Souto, Braga", data: new Date().toISOString() },
      { id: "3", userid: "1", tipo: "Passeio danificado", estado: "Não Aceite", descricao: "Mosaicos soltos no passeio central, perigo para peões.", localizacao: "Praça da República, Braga", data: new Date().toISOString() },
      { id: "4", userid: "2", tipo: "Falta de sinalização", estado: "Em curso", descricao: "Sinal de limite de velocidade removido ou roubado.", localizacao: "Rua do Raio, Braga", data: new Date().toISOString() }
    ];
    localStorage.setItem('ocorrencias', JSON.stringify(mockOcorrencias));
  }

  // Inject mock audits
  if (!localStorage.getItem('auditorias') || JSON.parse(localStorage.getItem('auditorias')).length === 0) {
    const mockAuditorias = [
      { id: "1", titulo: "Inspeção Semestral da Praça", data: new Date().toISOString(), perito: "Carlos Mendes", status: "Concluída", observacoes: "Tudo em conformidade, à exceção do piso." },
      { id: "2", titulo: "Avaliação Estrutural", data: new Date(Date.now() - 86400000).toISOString(), perito: "Marta Sousa", status: "Em andamento", observacoes: "A aguardar relatório final." }
    ];
    localStorage.setItem('auditorias', JSON.stringify(mockAuditorias));
  }
}

/* ================================================
   AUTH — Login / Logout state sync
   ================================================ */
function initAuth() {
  const isLogged = sessionStorage.getItem('islogged') === 'true';
  const user = JSON.parse(sessionStorage.getItem('userfront'));

  const loginContainer = document.getElementById('loginContainer');
  const sidebarAuthBtn = document.getElementById('sidebarAuthButton');
  const footerAuthBtn = document.getElementById('footerAuthButton');

  // --- Navbar auth state ---
  if (isLogged && user) {
    loginContainer.innerHTML = `
      <div class="user-profile">
        <img src="../imagens/defaultUser.png" alt="Foto de Perfil" class="profile-picture" />
        <span class="user-name">${user.name}</span>
      </div>
    `;
  }

  // --- Sidebar & Footer auth button visuals ---
  updateSidebarAuthButton(sidebarAuthBtn, isLogged);
  updateFooterAuthButton(footerAuthBtn, isLogged);

  // --- Auth click handler function ---
  const handleAuthClick = () => {
    if (sessionStorage.getItem('islogged') === 'true') {
      // Logout
      sessionStorage.setItem('islogged', 'false');
      sessionStorage.removeItem('userfront');

      loginContainer.innerHTML = `
        <a href="../../BackOffice/Login/LoginEyesEverywhere.html">
          <button class="btn btn-login">Login</button>
        </a>
      `;
      updateSidebarAuthButton(sidebarAuthBtn, false);
      updateFooterAuthButton(footerAuthBtn, false);
      updateSidebarLinks(false);
    } else {
      // Redirect to login
      window.location.href = '../../BackOffice/Login/LoginEyesEverywhere.html';
    }
  };

  // --- Bind click handlers ---
  if (sidebarAuthBtn) sidebarAuthBtn.addEventListener('click', handleAuthClick);
  if (footerAuthBtn) footerAuthBtn.addEventListener('click', handleAuthClick);

  // --- Sidebar links enabled/disabled ---
  updateSidebarLinks(isLogged);
}

function updateSidebarAuthButton(btn, isLogged) {
  if (!btn) return;
  if (isLogged) {
    btn.innerHTML = '<span class="icon">🔒</span><span class="label">Logout</span>';
    btn.classList.add('btn-logout');
    btn.classList.remove('btn-login-sidebar');
  } else {
    btn.innerHTML = '<span class="icon">🔑</span><span class="label">Login</span>';
    btn.classList.remove('btn-logout');
    btn.classList.add('btn-login-sidebar');
  }
}

function updateFooterAuthButton(btn, isLogged) {
  if (!btn) return;
  if (isLogged) {
    btn.textContent = 'Logout';
  } else {
    btn.textContent = 'Login';
  }
}

function updateSidebarLinks(isLogged) {
  const restricted = ['Criar ocorrência', 'Minhas Ocorrências', 'Ver Ocorrências', 'Notificações'];

  document.querySelectorAll('.sidebar-list li').forEach(item => {
    const label = item.querySelector('.label');
    if (label && restricted.includes(label.textContent.trim())) {
      item.style.pointerEvents = isLogged ? 'auto' : 'none';
      item.style.opacity = isLogged ? '1' : '0.5';
    }
  });
}

/* ================================================
   NAVBAR SCROLL — Smooth scroll + reveal animation
   ================================================ */
function initNavbarScroll() {
  const NAVBAR_HEIGHT = 100;

  // Custom easing scroll implementation for a professional dragging fluid feel
  function customSmoothScroll(targetElement, duration = 1000) {
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
  }

  // Navbar anchor links
  document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      customSmoothScroll(target, 1100);

      // Trigger a highlight pulse on the section
      target.classList.remove('section-reveal-active');
      void target.offsetWidth; // force reflow
      target.classList.add('section-reveal-active');
    });
  });

  // "Saber Mais" button
  const saberMaisBtn = document.querySelector('.saber-mais');
  if (saberMaisBtn) {
    saberMaisBtn.addEventListener('click', () => {
      const section = document.getElementById('sobre-nos');
      if (section) {
        customSmoothScroll(section, 1100);
        section.classList.remove('section-reveal-active');
        void section.offsetWidth;
        section.classList.add('section-reveal-active');
      }
    });
  }

  // Logo click — scroll to top
  const logo = document.getElementById('logoLink');
  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();
      
      const startPosition = window.pageYOffset;
      const distance = -startPosition;
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        let t = timeElapsed / (1100 / 2);
        let run = 0;
        if (t < 1) run = (distance / 2) * t * t * t + startPosition;
        else {
          t -= 2;
          run = (distance / 2) * (t * t * t + 2) + startPosition;
        }
        window.scrollTo(0, run);
        if (timeElapsed < 1100) requestAnimationFrame(animation);
      }
      requestAnimationFrame(animation);
    });
  }

  // Sidebar "Início" click — scroll to top
  const inicioLink = document.getElementById('inicioLink');
  if (inicioLink) {
    inicioLink.addEventListener('click', e => {
      e.preventDefault();
      
      const startPosition = window.pageYOffset;
      const distance = -startPosition;
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        let t = timeElapsed / (1100 / 2);
        let run = 0;
        if (t < 1) run = (distance / 2) * t * t * t + startPosition;
        else {
          t -= 2;
          run = (distance / 2) * (t * t * t + 2) + startPosition;
        }
        window.scrollTo(0, run);
        if (timeElapsed < 1100) requestAnimationFrame(animation);
      }
      requestAnimationFrame(animation);

      // Close sidebar after clicking
      if (document.body.classList.contains('sidebar-open')) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
      }
    });
  }
}

/* ================================================
   SCROLL REVEAL — IntersectionObserver animations
   ================================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.area-atuacao, #sobre-nos, .contacto, .locais-cobertos, .card, .stat, .box-sobre'
  );

  // Add the base class for CSS transitions
  revealElements.forEach(el => el.classList.add('scroll-reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ================================================
   MODALS — Unified handler for all modals
   ================================================ */
const CARD_MODAL_MAP = ['modalInfraestruturas', 'modalMonitorizacao', 'modalAuditorias'];

function initModals() {
  // "Sobre Nós" → Ver Mais
  const verMaisBtn = document.querySelector('#sobre-nos .box-sobre button');
  const sobreNosModal = document.getElementById('sobreNosModal');
  if (verMaisBtn && sobreNosModal) {
    verMaisBtn.addEventListener('click', () => openModal(sobreNosModal));
  }

  // "Áreas de Atuação" cards
  document.querySelectorAll('.area-atuacao .card').forEach((card, i) => {
    if (CARD_MODAL_MAP[i]) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const modal = document.getElementById(CARD_MODAL_MAP[i]);
        if (modal) openModal(modal);
      });
    }
  });

  // Close buttons inside modals
  document.querySelectorAll('.modal .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  // Click outside modal content to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // ESC key closes any open modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'flex') closeModal(modal);
      });
    }
  });
}

function openModal(modal) {
  modal.style.display = 'flex';
  modal.querySelector('.modal-content')?.classList.remove('modal-closing');
}

function closeModal(modal) {
  const content = modal.querySelector('.modal-content');
  if (!content) { modal.style.display = 'none'; return; }

  content.classList.add('modal-closing');
  content.addEventListener('animationend', function handler() {
    content.removeEventListener('animationend', handler);
    modal.style.display = 'none';
    content.classList.remove('modal-closing');
  });
}

/* ================================================
   NOTIFICATIONS — Badge count
   ================================================ */
function initNotifications() {
  const badge = document.querySelector('.sidebar-list .badge');
  const user = JSON.parse(sessionStorage.getItem('userfront'));
  const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];

  let count = 0;
  if (user) {
    count = ocorrencias.filter(o => o.userid === user.id && o.estado === 'Não Aceite').length;
  }

  if (badge) {
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // Click handler for notifications item
  const notifLabel = Array.from(document.querySelectorAll('.sidebar-list .label'))
    .find(label => label.textContent.trim() === 'Notificações');

  if (notifLabel) {
    notifLabel.closest('li').addEventListener('click', () => {
      window.location.href = '../Notificações/notificacoes.html';
    });
  }
}

/* ================================================
   CONTACT FORM
   ================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const contacto = {
      nome: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      telefone: document.getElementById('contactPhone').value.trim(),
      mensagem: document.getElementById('contactMessage').value.trim(),
      data: new Date().toISOString(),
    };

    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // Show success feedback
    if (feedback) {
      feedback.textContent = 'A sua mensagem foi enviada com sucesso! Entraremos em contacto brevemente.';
      feedback.className = 'form-feedback success';
    }

    form.reset();

    // Clear feedback after 5 seconds
    setTimeout(() => {
      if (feedback) feedback.textContent = '';
    }, 5000);
  });
}