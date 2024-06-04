"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const AppointmentRouter_1 = __importDefault(require("./AppointmentRouter"));
const indexRouter = (0, express_1.Router)();
indexRouter.use("/users", userRouter_1.default);
indexRouter.use("/appointments", AppointmentRouter_1.default);
exports.default = indexRouter;
