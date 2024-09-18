//IMPORTACION
import { z } from "zod";
//FIN IMPORTACION

//SCHEMAS
export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
    }),
    email: z
        .string({
            required_error: "El email es requerido",
        })
        .email({
            message: "Email inválido",
        }),
    password: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "El email es requerido",
        })
        .email({
            message: "Email no es válido",
        }),
    password: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
});
//FIN SCHEMAS