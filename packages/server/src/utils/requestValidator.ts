import {
  ContextConfigDefault,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify";
import { ZodError, infer as ZodInfer, ZodObject } from "zod";

type ValidationSchemas = {
  headersSchema?: ZodObject<any>;
  bodySchema?: ZodObject<any>;
  paramsSchema?: ZodObject<any>;
  querySchema?: ZodObject<any>;
  replySchema: ZodObject<any>;
};

type InferValidatedData<Schemas extends ValidationSchemas> = {
  headers: Schemas["headersSchema"] extends ZodObject<any>
    ? ZodInfer<Schemas["headersSchema"]>
    : undefined;
  body: Schemas["bodySchema"] extends ZodObject<any>
    ? ZodInfer<Schemas["bodySchema"]>
    : undefined;
  params: Schemas["paramsSchema"] extends ZodObject<any>
    ? ZodInfer<Schemas["paramsSchema"]>
    : undefined;
  query: Schemas["querySchema"] extends ZodObject<any>
    ? ZodInfer<Schemas["querySchema"]>
    : undefined;
};

export const requestValidator = <Schemas extends ValidationSchemas>(
  onSuccess: (
    validatedData: InferValidatedData<Schemas>,
    res: FastifyReply<
      RouteGenericInterface,
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      ContextConfigDefault,
      FastifySchema,
      FastifyTypeProviderDefault,
      ZodInfer<Schemas["replySchema"]>
    >
  ) => Promise<FastifyReply>,
  data: Schemas & {
    req: FastifyRequest;
    res: FastifyReply;
  }
) => {
  const { req, res, bodySchema, headersSchema, paramsSchema, querySchema } =
    data;
  const validatedData: Partial<InferValidatedData<Schemas>> = {};

  try {
    if (headersSchema) {
      // TODO: Replace with proper typing
      validatedData.headers = headersSchema.parse(req.headers) as any;
    }

    if (bodySchema) {
      // TODO: Replace with proper typing
      validatedData.body = bodySchema.parse(req.body) as any;
    }

    if (paramsSchema) {
      // TODO: Replace with proper typing
      validatedData.params = paramsSchema.parse(req.params) as any;
    }

    if (querySchema) {
      // TODO: Replace with proper typing
      validatedData.query = querySchema.parse(req.query) as any;
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return res.badRequest("Please re-verify your request");
    } else {
      return res.internalServerError("Please contact support");
    }
  }

  // If validation passes, call onSuccess with validated data
  return onSuccess(
    validatedData as InferValidatedData<Schemas>,
    res as FastifyReply<
      RouteGenericInterface,
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      ContextConfigDefault,
      FastifySchema,
      FastifyTypeProviderDefault,
      ZodInfer<Schemas["replySchema"]>
    >
  );
};
