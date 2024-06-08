import { Router } from "express";
import {
  cancel,
  getAllappointments,
  getAppointmentsById,
  schedule,
} from "../controllers/AppointmentControllers";
const appointmentRouters = Router();

appointmentRouters.get("/", getAllappointments);
appointmentRouters.get("/:id", getAppointmentsById);
appointmentRouters.post("/schedule", schedule);
appointmentRouters.put("/cancel/:id", cancel);

export default appointmentRouters;
