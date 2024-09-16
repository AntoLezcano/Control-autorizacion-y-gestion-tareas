import { z } from "zod";

export const tareaSchema = z.object({
  nombre: z.string({
    required_error: "el nombre es requerido",
  }),

  descripcion: z.string({
    required_error: "la descripción es requerida",
  }),

  fecha: z.string().datetime().optional(),
});
