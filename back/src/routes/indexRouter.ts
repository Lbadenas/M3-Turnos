import { Router } from "express";
import usersRouter from "./userRouter";
import turnsrouter from "./turnRouters";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/turns", turnsrouter);

export default indexRouter;
