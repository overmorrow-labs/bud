import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { hello: "world2" };
});

const start = async () => {
  try {
    await server.listen({ port: 3002, host: "0.0.0.0" });
    console.log("Server listening on http://localhost:3002");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
