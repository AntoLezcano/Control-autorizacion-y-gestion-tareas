// src/router.js
import { renderLoginPage } from './pages/LoginPage.js';
import { renderRegisterPage } from './pages/RegisterPage.js';
import { renderTareaPage } from './pages/TareaPage.js';

function router() {
  const path = window.location.pathname;

  if (path === '/') {
    renderLoginPage();
  } else if (path === '/register') {
    renderRegisterPage();
  } else if (path === '/home') {
    renderTareaPage();
  } else {
    window.location.pathname = '/';
  }
}

window.addEventListener('load', router);
window.addEventListener('popstate', router);
