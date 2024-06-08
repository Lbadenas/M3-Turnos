import { Router } from "express";
import usersRouter from "./userRouter";
import appointmentRouters from "./appointmentRouters";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentRouters);

export default indexRouter;
