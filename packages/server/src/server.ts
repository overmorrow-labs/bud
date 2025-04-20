import fastify from "fastify";
import fsSensible from "@fastify/sensible";
import { controllers } from "./controllers";
import { dbClient } from "./services/db";

(async () => {
  const server = fastify({ logger: true });
  await server.register(fsSensible);
  await dbClient.connect();

  // ---------------------------------------------------------------

  server.get("/get-session", controllers.getSession);

  // ---------------------------------------------------------------

  server.listen({ port: 3002 });
})();
