import { RouteHandlerMethod } from "fastify";
import { z } from "zod";
import { requestValidator } from "../utils/requestValidator";
import { BufferMemory } from "langchain/memory";
import { dbClient } from "../services/db";
import { ObjectId } from "mongodb";
import { ConversationChain } from "langchain/chains";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { ChatOllama } from "@langchain/ollama";
import { sessions } from "../services/sessions";

const headersSchema = z.object({
  test: z.string(),
});

const replySchema = z.object({
  sessionId: z.string(),
});

// ---------------------------------------------------------------

export default (function (req, res) {
  requestValidator(
    // ----------------------------------------
    async (_, res) => {
      const collection = dbClient.db("langchain").collection("memory");
      const sessionId = new ObjectId().toString();
      // ----------------------------------------
      const memory = new BufferMemory({
        chatHistory: new MongoDBChatMessageHistory({
          collection,
          sessionId,
        }),
      });
      const model = new ChatOllama({
        baseUrl: "http://localhost:11434", // Default value
        model: "llama3.2:latest", // Default value
      });
      const chain = new ConversationChain({ llm: model, memory });
      await chain.invoke({ input: "Hi! I'm Jim." });
      // ----------------------------------------
      sessions.set(sessionId, chain);
      // ----------------------------------------
      return res.send({
        sessionId,
      });
    },
    // ----------------------------------------
    {
      headersSchema,
      replySchema,
      req,
      res,
    }
  );
} as RouteHandlerMethod);
