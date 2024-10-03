"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentModel = exports.userModel = exports.credentialModel = void 0;
const appDataSoruces_1 = require("../config/appDataSoruces");
const Appointment_1 = __importDefault(require("../entities/Appointment"));
const Credential_1 = __importDefault(require("../entities/Credential"));
const User_1 = __importDefault(require("../entities/User"));
exports.credentialModel = appDataSoruces_1.AppDataSource.getRepository(Credential_1.default);
exports.userModel = appDataSoruces_1.AppDataSource.getRepository(User_1.default);
exports.appointmentModel = appDataSoruces_1.AppDataSource.getTreeRepository(Appointment_1.default);
