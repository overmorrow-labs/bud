import dotenv from "dotenv";
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
dotenv.config();

export default async (server: FastifyInstance) => {
  if (process.env.MONGODB_URI) {
    server.log.info("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      driverInfo: { name: "langchainjs" },
      dbName: "bud",
    });
    server.log.info("MongoDB connected successfully");
  } else {
    throw new Error("MongoDB URI is not defined in the environment variables.");
  }
};
