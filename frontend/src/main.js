import './style.css';
import { renderHomePage } from './pages/HomePage.js';
import { renderLoginPage } from './pages/LoginPage.js';
import { renderRegisterPage } from './pages/RegisterPage.js';

function router() {
  const path = window.location.pathname;

  if (path === '/') {
    // Redirige a la página de inicio si es la raíz
    renderHomePage();
  } else if (path === '/register') {
    renderRegisterPage();
  } else if (path === '/login') {
    renderLoginPage();
  } else if (path === '/home') {
    // La página de inicio es la que se muestra después del login
    renderHomePage();
  } else {
    window.location.pathname = '/'; // Redirige a la página de inicio si la ruta no es válida
  }
}

window.addEventListener('load', router);
window.addEventListener('popstate', router);
