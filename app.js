(function () {
  const LOGIN_PHONE = '8299021878';
  const SESSION_KEY = 'happy_panel_logged_in';

  const loginScreen = document.getElementById('login-screen');
  const appPanel = document.getElementById('app-panel');
  const loginForm = document.getElementById('login-form');
  const loginPhone = document.getElementById('login-phone');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  function showPanel() {
    if (loginScreen) loginScreen.style.display = 'none';
    if (appPanel) appPanel.style.display = 'flex';
    sessionStorage.setItem(SESSION_KEY, '1');
  }

  function showLogin() {
    sessionStorage.removeItem(SESSION_KEY);
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appPanel) appPanel.style.display = 'none';
  }

  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    showPanel();
  } else {
    showLogin();
  }

  if (loginForm && loginPhone && loginError) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var num = loginPhone.value.replace(/\D/g, '');
      if (num === LOGIN_PHONE) {
        loginError.style.display = 'none';
        showPanel();
      } else {
        loginError.style.display = 'block';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      showLogin();
    });
  }

  const pageTitles = {
    dashboard: 'Dashboard',
    users: 'Users',
    orders: 'Orders',
    products: 'Products',
    settings: 'Settings'
  };

  const navItems = document.querySelectorAll('.nav-item[data-page]');
  const pages = document.querySelectorAll('.page');
  const pageTitleEl = document.querySelector('.page-title');
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  function showPage(pageId) {
    pages.forEach(function (page) {
      page.classList.toggle('active', page.id === 'page-' + pageId);
    });
    navItems.forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-page') === pageId);
    });
    if (pageTitleEl && pageTitles[pageId]) {
      pageTitleEl.textContent = pageTitles[pageId];
    }
    if (sidebar && window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  }

  navItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const page = item.getAttribute('data-page');
      if (page) showPage(page);
    });
  });

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
})();
