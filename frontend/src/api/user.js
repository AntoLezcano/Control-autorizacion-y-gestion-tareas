const baseURL = "http://localhost:4000";

// Registro de usuario
export async function register(data) {
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || 'Error en el registro',
      };
    }

    const result = await response.json();
    return { success: true, token: result.token }; // Suponiendo que el backend devuelve un token
  } catch (error) {
    return { success: false, message: error.message || 'Error en el registro' };
  }
}

// Iniciar sesión
export async function login(data) {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        success: false,
        message: errorResponse.message || 'Error en el inicio de sesión',
      };
    }

    const result = await response.json();
    return { success: true, token: result.token }; // Suponiendo que el backend devuelve un token
  } catch (error) {
    return { success: false, message: error.message || 'Error en el inicio de sesión' };
  }
}

// Obtener perfil de usuario
export async function getProfile(token) {
  try {
    const response = await fetch(`${baseURL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Error al obtener perfil');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}
