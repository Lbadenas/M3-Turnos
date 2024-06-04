import server from "./server";
import "dotenv/config";

server.listen(process.env.PORT, () => {
  console.log(`server escuchando en el http://localhost:${process.env.PORT}`);
});
