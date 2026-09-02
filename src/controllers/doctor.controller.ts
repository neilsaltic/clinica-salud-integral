import type { Request, Response } from "express";
import { medicoModel } from "../models/doctor.model";

// ✅ Obtener todos
export async function getMedicos(req: Request, res: Response) {
  try {
    const result = await medicoModel.findAll();
    res.json({ total: result.length, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al conectar a la Base de Datos" });
  }
}

// ✅ Obtener por ID
export async function getMedicoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número" });
    }
    const medico = await medicoModel.findById(id);
    if (!medico) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }
    return res.json(medico);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener al Médico" });
  }
}

// ✅ Crear
export async function createMedico(req: Request, res: Response) {
  try {
    const medico = await medicoModel.create(req.body);
    return res.status(201).json(medico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el Médico" });
  }
}

// ✅ Actualizar
export async function updateMedico(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número" });
    }
    const medico = await medicoModel.update(id, req.body);
    if (!medico) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }
    return res.json(medico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar al Médico" });
  }
}

// ✅ Eliminar
export async function deleteMedico(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número" });
    }
    const eliminado = await medicoModel.delete(id);
    if (!eliminado) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }
    return res.json({ message: "Médico eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar al Médico" });
  }
}
