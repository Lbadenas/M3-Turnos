"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const env_1 = require("./config/env");
const server_1 = __importDefault(require("./server"));
const appDataSoruces_1 = require("./config/appDataSoruces");
appDataSoruces_1.AppDataSource.initialize()
    .then(() => {
    console.log(`Database Connected on port ${env_1.DB_PORT}`);
    server_1.default.listen(env_1.PORT, () => {
        console.log(`Server listening on http://localhost:${env_1.DB_PORT}`);
    });
})
    .catch((error) => console.log(error));
