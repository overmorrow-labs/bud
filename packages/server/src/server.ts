import fastify from "fastify";
import fsSensible from "@fastify/sensible";
import fsCors from "@fastify/cors";
import { controllers } from "./controllers";
import { services } from "./services";

(async () => {
  const server = fastify({ logger: true });
  await server.register(fsSensible);
  await server.register(fsCors, { origin: "*" });
  await services.db(server);

  // ---------------------------------------------------------------

  server.post("/chat", controllers.chat);

  // ---------------------------------------------------------------

  server.listen({ port: 3002 });
})();
