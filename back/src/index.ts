import "reflect-metadata";
import { DB_PORT, PORT } from "./config/env";
import server from "./server";
import { AppDataSource } from "./config/appDataSoruces";

AppDataSource.initialize()
  .then(() => {
    console.log(`Database Connected on port ${DB_PORT}`);
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${DB_PORT}`);
    });
  })
  .catch((error) => console.log(error));
