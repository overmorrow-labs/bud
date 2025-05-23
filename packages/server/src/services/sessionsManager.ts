import { ConversationChain } from "langchain/chains";
import { ObjectId } from "mongodb";
import { BufferMemory } from "langchain/memory";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { ChatOllama } from "@langchain/ollama";
import mongoose from "mongoose";

export class SessionsManager {
  private ollamaModel = new ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama3.2:latest", // Default value
  });

  constructor() {}

  getSession(sessionId?: string) {
    const dbClient = mongoose.connection.getClient();
    const collection = dbClient.db("langchain").collection("memory");
    const sessionIdLocal = sessionId ?? new ObjectId().toString();
    // ----------------------------------------
    const memory = new BufferMemory({
      chatHistory: new MongoDBChatMessageHistory({
        collection,
        sessionId: sessionIdLocal,
      }),
    });
    const chain = new ConversationChain({ llm: this.ollamaModel, memory });
    // ----------------------------------------
    return {
      chain,
      sessionId: sessionIdLocal,
    };
  }
}
