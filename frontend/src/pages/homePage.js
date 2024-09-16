export function renderHomePage() {
    document.body.innerHTML = `
      <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 class="text-4xl font-bold mb-8">CRUD-Autorización</h1>
        <button id="registerButton" class="bg-blue-500 text-white px-6 py-3 rounded">Registrarse</button>
      </div>
    `;

    document.getElementById('registerButton').addEventListener('click', () => {
        window.location.pathname = '/register'; // Redirige a la página de registro
    });
}
