import fastify from "fastify";
import fsSensible from "@fastify/sensible";
import { controllers } from "./controllers";

(async () => {
  const server = fastify({ logger: true });
  await server.register(fsSensible);

  // ---------------------------------------------------------------

  server.get("/get-session", controllers.getSession);

  // ---------------------------------------------------------------

  server.listen({ port: 3002 });
})();
