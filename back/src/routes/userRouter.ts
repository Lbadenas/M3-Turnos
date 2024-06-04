import { Router } from "express";
import {
  getAllUsers,
  getUserByID,
  login,
  registerUsers,
} from "../controllers/userController";

const usersRouter: Router = Router();
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserByID);
usersRouter.post("/register", registerUsers);
usersRouter.post("/login", login);

export default usersRouter;
