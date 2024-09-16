import Swal from 'sweetalert2';
import { getProfile } from '../api/user.js';
import { createTarea } from '../api/tarea.js';

export async function renderTareaPage() {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    const user = await getProfile(token);

    document.body.innerHTML = `
    <div class="flex flex-col h-screen bg-gray-100">
      <header class="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div>
          <span class="text-xl font-bold">Bienvenido, ${user.name}</span>
        </div>
        <button id="logoutButton" class="bg-red-500 px-4 py-2 rounded">Cerrar Sesión</button>
      </header>
      <main class="flex-1 p-6">
        <form id="tareaForm" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl mb-4">Crear Tarea</h2>
          <input id="taskTitle" type="text" placeholder="Título de la tarea" class="border p-2 mb-4 w-full" />
          <textarea id="taskDescription" placeholder="Descripción" class="border p-2 mb-4 w-full" rows="4"></textarea>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear Tarea</button>
        </form>
      </main>
    </div>
  `;

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });

    document.getElementById('tareaForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        const response = await createTarea({ title, description }, token);

        if (response.success) {
            Swal.fire('Tarea Creada', 'La tarea se ha creado exitosamente.', 'success');
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
        } else {
            Swal.fire('Error', response.message || 'Ocurrió un error al crear la tarea.', 'error');
        }
    });
}
