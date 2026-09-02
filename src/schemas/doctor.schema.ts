import { z } from "zod";

// ✅ Crear Médico: TODOS obligatorios
export const createMedicoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  apellido: z.string().trim().min(1, "El apellido es obligatorio"),
  email: z.string().trim().email("El correo no tiene un formato válido"),
  especialidad_id: z.coerce
    .number()
    .int()
    .positive("El ID de especialidad debe ser un número positivo"),
});

// ✅ Actualizar Médico: TODOS opcionales
export const updateMedicoSchema = z
  .object({
    nombre: z.string().trim().min(1, "El nombre es obligatorio").optional(),
    apellido: z.string().trim().min(1, "El apellido es obligatorio").optional(),
    email: z
      .string()
      .trim()
      .email("El correo no tiene un formato válido")
      .optional(),
    especialidad_id: z.coerce
      .number()
      .int()
      .positive("El ID de especialidad debe ser un número positivo")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un dato para actualizar",
  });
