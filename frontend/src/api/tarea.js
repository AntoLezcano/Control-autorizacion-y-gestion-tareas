// src/api/tareas.js
const baseURL = 'http://localhost:4000';

// Crear tarea
export async function createTarea(data, token) {
    try {
        const response = await fetch(`${baseURL}/tarea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return {
                success: false,
                message: errorResponse.message || 'Error al crear la tarea',
            };
        }

        const result = await response.json();
        return { success: true, ...result };
    } catch (error) {
        return { success: false, message: error.message || 'Error al crear la tarea' };
    }
}
