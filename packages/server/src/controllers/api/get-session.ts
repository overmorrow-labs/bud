import { RouteHandlerMethod } from "fastify";
import { z } from "zod";
import { requestValidator } from "../../utils/requestValidator";

const headersSchema = z.object({
  test: z.string(),
});

const bodySchema = z.object({});

const paramsSchema = z.object({});

const querySchema = z.object({});

const replySchema = z.object({});

export default (function (req, res) {
  requestValidator(
    async (props, res) => {
      return res.send();
    },
    {
      headersSchema,
      bodySchema,
      paramsSchema,
      querySchema,
      replySchema,
      req,
      res,
    }
  );
} as RouteHandlerMethod);
