import { RouteHandlerMethod } from "fastify";
import { SessionsManager } from "../services/sessionsManager";
import { requestValidator } from "../utils/requestValidator";
import { controllers } from "@bud/shared";

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
      headersSchema: controllers.chat.headersSchema,
      bodySchema: controllers.chat.bodySchema,
      replySchema: controllers.chat.replySchema,
      req,
      res,
    }
  );
} as RouteHandlerMethod);
