//IMPORTACIONES
import Swal from 'sweetalert2';
import { register } from '../api/user.js';
import { registerSchema } from '../api/schemas.js'; // Importa el esquema de validación

//FUNCION DE RENDERIZAR REGISTRO
export function renderRegisterPage() {
  document.body.innerHTML = `
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <form id="registerForm" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl mb-4">Registro</h2>
        <input id="name" type="text" placeholder="Nombre" class="border p-2 mb-4 w-full" />
        <input id="email" type="email" placeholder="Email" class="border p-2 mb-4 w-full" />
        <input id="password" type="password" placeholder="Contraseña" class="border p-2 mb-4 w-full" />
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Registrar</button>
        <p class="mt-4">¿Ya tienes una cuenta? <a id="loginLink" class="text-blue-500 cursor-pointer">Inicia sesión aquí</a></p>
      </form>
    </div>
  `;

  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación con Zod
    const validationResult = registerSchema.safeParse({ name, email, password });
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(err => err.message).join('\n');
      Swal.fire('Error', errorMessages, 'error');
      return;
    }

    const response = await register({ name, email, password });

    if (response.success) {
      Swal.fire('Registro Exitoso', 'Redirigiendo al login...', 'success').then(() => {
        window.location.pathname = '/login';
      });
    } else {
      Swal.fire('Error', response.message || 'Ocurrió un error', 'error');
    }
  });

  document.getElementById('loginLink').addEventListener('click', () => {
    window.location.pathname = '/login';
  });
}