import { z } from "zod";

export const PatientSchema = z.object({
  nombre: z
    .string("El nombre es Obligatorio")
    .trim()
    .min(1, "El nombre es Obligatorio"),
  apellido: z
    .string("El apellido es Obligatorio")
    .trim()
    .min(1, "El apellido es Obligatorio"),
  email: z
    .string("el email es obligatorio")
    .trim()
    .email("el correo no tiene un formato valido"),
  fechaNacimiento: z.coerce
    .date("la fechaes obligatoria")
    .max(new Date(), "la fehca de nacimiento no puede ser futura"),
});

export const updatePatientSchema = z
  .object({
    nombre: z.string().trim().min(1, "El nombre es Obligatorio").optional(),
    apellido: z.string().trim().min(1, "El apellido es Obligatorio").optional(),
    email: z
      .string()
      .trim()
      .email("el correo no tiene un formato valido")
      .optional(),
    fechaNacimiento: z.coerce
      .date()
      .max(new Date(), "la fecha de nacimiento no puede ser futura")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un dato para actualizar",
  });
