import express from "express";
import "dotenv/config";
import prisma from "./config/prisma";
import PatientRouter from "./routes/paciente.router.js";
import MedicoRouter from "./routes/doctor.router";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({
    message: "API Clínica Salud Integral funcionando",
  });
});

app.use("/api/pacientes", PatientRouter);
app.use("/api/medicos", MedicoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
