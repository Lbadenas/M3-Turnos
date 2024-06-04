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
exports.cancel = exports.schedule = exports.getAppointmentById = exports.getAllAppointment = void 0;
const getAllAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .json({ message: "obtener el listado de todos los turnos del usuario" });
});
exports.getAllAppointment = getAllAppointment;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "el detalle de un turno especifico" });
});
exports.getAppointmentById = getAppointmentById;
const schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "cronograma de turnos" });
});
exports.schedule = schedule;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .json({ message: "cancelar el estatus de un turno cancelado" });
});
exports.cancel = cancel;
