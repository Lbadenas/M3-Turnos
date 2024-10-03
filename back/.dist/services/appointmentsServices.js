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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdServices = exports.getAllAppointmentsServices = void 0;
const iAppointment_1 = require("../interfaces/iAppointment");
const repositories_1 = require("../repositories");
const date_fns_1 = require("date-fns");
let appointments = [
    {
        id: 1,
        date: "03/06/2024",
        time: "14:00hs",
        userId: 1,
        status: iAppointment_1.IStatus.ACTIVE,
        description: "esto es un turno para cortarme el pelo",
    },
];
let id = 10;
const getAllAppointmentsServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTAppointments = yield repositories_1.appointmentModel.find();
    return allTAppointments;
});
exports.getAllAppointmentsServices = getAllAppointmentsServices;
const getAppointmentByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield repositories_1.appointmentModel.findOneBy({
        id: id,
    });
    if (!appointment)
        throw new Error("No existe el turno");
    return appointment;
});
exports.getAppointmentByIdServices = getAppointmentByIdServices;
const createAppointmentService = (createAppointmentDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, userId } = createAppointmentDto;
    const appointmentDate = new Date(date);
    if ((0, date_fns_1.isWeekend)(appointmentDate)) {
        throw new Error("No se pueden programar citas los fines de semana (sábado y domingo).");
    }
    const user = yield repositories_1.userModel.findOneBy({ id: userId });
    if (!user)
        throw new Error("usuario inexistente");
    const newAppointment = repositories_1.appointmentModel.create(createAppointmentDto);
    yield repositories_1.appointmentModel.save(newAppointment);
    newAppointment.user = user;
    yield repositories_1.appointmentModel.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield repositories_1.appointmentModel.findOneBy({
        id: id,
    });
    if (!appointment)
        throw new Error("turno inexistente");
    appointment.status = "cancelled";
    yield repositories_1.appointmentModel.save(appointment);
});
exports.cancelAppointmentService = cancelAppointmentService;
