import type { Server } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >;
  }
}

export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  prompt: (message: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
