import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const dbClient = new MongoClient(process.env.MONGODB_URI || "", {
  driverInfo: { name: "langchainjs" },
});
