"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.schedule = exports.getAppointmentsById = exports.getAllappointments = void 0;
const appointmentsServices_1 = require("../services/appointmentsServices");
const date_fns_1 = require("date-fns");
const getAllappointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Appointment = yield (0, appointmentsServices_1.getAllAppointmentsServices)();
        res.status(200).json(Appointment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getAllappointments = getAllappointments;
const getAppointmentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Appointment = yield (0, appointmentsServices_1.getAppointmentByIdServices)(Number(id));
        res.status(200).json(Appointment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getAppointmentsById = getAppointmentsById;
const schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userId, description } = req.body;
        if ((0, date_fns_1.isWeekend)(date)) {
            return res
                .status(400)
                .json({ message: "La fecha seleccionada es un fin de semana" });
        }
        const newAppointment = yield (0, appointmentsServices_1.createAppointmentService)({
            date,
            time,
            userId,
            description,
        });
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.schedule = schedule;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, appointmentsServices_1.cancelAppointmentService)(Number(id));
        res.status(200).json("turno cancelado");
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.cancel = cancel;
