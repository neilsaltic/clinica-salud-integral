import express from "express";
import "dotenv/config";
import prisma from "./config/prisma";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({
    message: "API Clínica Salud Integral funcionando",
  });
});

app.get("/api/especialidades", async (_req, res) => {
  try {
    const specialties = await prisma.especialidades.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(specialties);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener las especialidades",
    });
  }
});

app.get("/api/doctores", async (_req, res) => {
  try {
    const doctors = await prisma.medicos.findMany({
      include: {
        especialidad: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(doctors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener los médicos",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
