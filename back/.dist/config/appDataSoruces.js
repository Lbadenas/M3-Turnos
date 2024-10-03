"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const User_1 = __importDefault(require("../entities/User"));
const Credential_1 = __importDefault(require("../entities/Credential"));
const Appointment_1 = __importDefault(require("../entities/Appointment"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: env_1.DB_HOST,
    port: Number(env_1.DB_PORT),
    username: env_1.DB_USER,
    password: env_1.DB_PASSWORD,
    database: env_1.DB_NAME,
    synchronize: true,
    dropSchema: false,
    logging: ["error"],
    entities: [User_1.default, Credential_1.default, Appointment_1.default],
    subscribers: [],
    migrations: [],
    extra: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
