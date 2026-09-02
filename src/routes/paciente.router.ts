import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  PatientSchema,
  updatePatientSchema,
} from "../schemas/paciente.schema.js";
import {
  createPatient,
  deletePatient,
  getPatients,
  getPatientsById,
  updatePatient,
} from "../controllers/paciente.controller.js";

const PatientRouter: Router = Router();

PatientRouter.get("/", getPatients);
PatientRouter.get("/:id", getPatientsById);
PatientRouter.post("/", validate(PatientSchema), createPatient);
PatientRouter.put("/:id", validate(updatePatientSchema), updatePatient);
PatientRouter.delete("/:id", deletePatient);

export default PatientRouter;
