import type { Request, Response } from "express";
import { patientModel } from "../models/paciente.model.js";

export async function getPatients(req: Request, res: Response) {
  try {
    const result = await patientModel.findAll();
    res.json({ total: result.length, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al conectar a la Base de Datos" });
  }
}

export async function getPatientsById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El Id debe ser un numero " });
    }
    const paciente = await patientModel.findById(id);
    if (!paciente) {
      return res.status(404).json({ message: "paciente no encontrado" });
    }
    return res.json(paciente);
  } catch (error) {
    return res.status(500).json({ error: "Error al Obtener al Paciente" });
  }
}

export async function createPatient(req: Request, res: Response) {
  try {
    const paciente = await patientModel.create(req.body);
    return res.status(201).json(paciente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el paciente" });
  }
}

export async function updatePatient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El Id debe ser un numero " });
    }
    const paciente = await patientModel.update(id, req.body);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    return res.json(paciente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "no se pudo actualizar al Paciente" });
  }
}

export async function deletePatient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El Id debe ser un numero " });
    }
    const eliminado = await patientModel.delete(id);
    if (!eliminado) {
      return res.status(404).json({ message: "paciente no encontrado" });
    }
    return res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al Eliminar al Paciente" });
  }
}
