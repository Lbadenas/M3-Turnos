import "reflect-metadata";
import { DB_PORT, PORT } from "./config/env"; // Aquí PORT tomará la variable de entorno de Render
import server from "./server";
import { AppDataSource } from "./config/appDataSoruces";

AppDataSource.initialize()
  .then(() => {
    console.log(`Database Connected on port ${DB_PORT}`);
    server.listen(PORT, () => {
      // Usa el puerto dinámico proporcionado por Render
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
