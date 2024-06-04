import { Router } from "express";
import {
  cancel,
  getAllTurns,
  getTurnsById,
  schedule,
} from "../controllers/turnControllers";
const turnsRouters = Router();

turnsRouters.get("/", getAllTurns);
turnsRouters.get("/:id", getTurnsById);
turnsRouters.post("/schedule", schedule);
turnsRouters.put("/cancel/:id", cancel);

export default turnsRouters;
