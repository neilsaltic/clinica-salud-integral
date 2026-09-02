import prisma from "../config/prisma.js";

// Interfaz con tipos
interface Medico {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  especialidad_id: number;
}

type CreateMedicoData = Omit<Medico, "id">;

export const medicoModel = {
  findAll: async (specialtyName?: string) => {
    const whereCondition = specialtyName
      ? { especialidad: { nombre: { contains: specialtyName } } }
      : {};

    return await prisma.medicos.findMany({
      where: whereCondition,
      include: { especialidad: true },
      orderBy: { id: "asc" },
    });
  },

  findById: async (id: number) => {
    return await prisma.medicos.findUnique({
      where: { id },
      include: { especialidad: true },
    });
  },

  create: async (data: CreateMedicoData) => {
    return await prisma.medicos.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        especialidadId: data.especialidad_id,
      },
      include: { especialidad: true },
    });
  },

  update: async (
    id: number,
    datos: {
      nombre?: string;
      apellido?: string;
      email?: string;
      especialidadId?: number;
    },
  ) => {
    return await prisma.medicos.update({
      where: { id },
      data: datos,
      include: { especialidad: true },
    });
  },

  delete: async (id: number) => {
    return await prisma.medicos.delete({
      where: { id },
    });
  },
};
