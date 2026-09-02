import prisma from "../config/prisma.js";

interface Paciente {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: Date;
}

export const patientModel = {
  findAll: async () => {
    return await prisma.pacientes.findMany({
      orderBy: { id: "asc" },
    });
  },
  findById: async (id: number) => {
    return await prisma.pacientes.findUnique({
      where: { id },
    });
  },
  create: async (data: Paciente) => {
    return await prisma.pacientes.create({
      data,
    });
  },
  update: async (
    id: number,
    datos: {
      nombre?: string;
      apellido?: string;
      email?: string;
      fechaNacimiento?: Date;
    },
  ) => {
    const datosParaActualizar = {
      ...datos,
      ...(datos.fechaNacimiento && {
        fechaNacimiento: new Date(datos.fechaNacimiento),
      }),
    };
    return await prisma.pacientes.update({
      where: { id },
      data: datosParaActualizar,
    });
  },

  delete: async (id: number) => {
    return await prisma.pacientes.delete({ where: { id } });
  },
};
