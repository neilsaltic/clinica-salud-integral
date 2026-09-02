import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import {
  createMedicoSchema,
  updateMedicoSchema,
} from "../schemas/doctor.schema.js";
import {
  getMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico,
} from "../controllers/doctor.controller.js";

const MedicoRouter: Router = Router();

MedicoRouter.get("/", getMedicos);
MedicoRouter.get("/:id", getMedicoById);
MedicoRouter.post("/", validate(createMedicoSchema), createMedico);
MedicoRouter.put("/:id", validate(updateMedicoSchema), updateMedico);
MedicoRouter.delete("/:id", deleteMedico);

export default MedicoRouter;
