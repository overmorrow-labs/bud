import { RouteHandlerMethod } from "fastify";
import { z } from "zod";
import { SessionsManager } from "../services/sessionsManager";
import { requestValidator } from "../utils/requestValidator";
import { ObjectId } from "mongodb";

const headersSchema = z.object({
  sessionid: z
    .string()
    .refine((val) => {
      return ObjectId.isValid(val);
    })
    .optional(),
});

const bodySchema = z.object({
  prompt: z.string(),
});

const replySchema = z.object({
  response: z.string(),
  sessionId: z.string(),
});

// ---------------------------------------------------------------

export default (function (req, res) {
  requestValidator(
    // ----------------------------------------
    async (props, res) => {
      const { sessionid } = props.headers;
      const { prompt } = props.body;
      // ----------------------------------------
      const sessionsManager = new SessionsManager();
      const { chain, sessionId } = sessionsManager.getSession(sessionid);
      // ----------------------------------------
      const response = await chain.invoke({ input: prompt });
      const responseText = response["response"];
      console.log({ response });
      // ----------------------------------------
      return res.send({
        response: responseText,
        sessionId: sessionId,
      });
    },
    // ----------------------------------------
    {
      headersSchema,
      bodySchema,
      replySchema,
      req,
      res,
    }
  );
} as RouteHandlerMethod);
