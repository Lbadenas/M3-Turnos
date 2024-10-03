import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./env";
import User from "../entities/User";
import Credential from "../entities/Credential";
import Turn from "../entities/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  dropSchema: false,
  logging: ["error"],
  entities: [User, Credential, Turn],
  subscribers: [],
  migrations: [],
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Importante para evitar errores en conexiones sin un certificado verificado
    },
  },
});
