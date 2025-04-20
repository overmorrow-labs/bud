import fastify from "fastify";
import fsSocketIO from "fastify-socket.io";
import fsSensible from "@fastify/sensible";
import { controllers } from "./controllers";

const server = fastify({ logger: false });
server.register(fsSocketIO);
server.register(fsSensible);

// ---------------------------------------------------------------

server.get("/get-session", controllers.api.getSession);

// ---------------------------------------------------------------

server.ready((err) => {
  if (err) throw err;
  // ----------------------------------------
  server.io.on("connection", (socket) => {
    console.info("Socket connected!", socket.id);
  });
});

server.listen({ port: 3002 });
