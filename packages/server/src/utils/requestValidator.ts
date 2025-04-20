import {
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import { infer as ZodInfer, ZodObject } from "zod";

type ValidationSchemas = {
  headersSchema?: ZodObject<any>;
  bodySchema?: ZodObject<any>;
  paramsSchema?: ZodObject<any>;
  querySchema?: ZodObject<any>;
  replySchema: ZodObject<any>;
};

type InferValidatedData<Schemas extends ValidationSchemas> = {
  headersSchema: Schemas["headersSchema"] extends ZodObject<any>
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
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      { Reply: ZodInfer<Schemas["replySchema"]> }
    >
  ) => Promise<FastifyReply>,
  data: Schemas & {
    req: FastifyRequest;
    res: FastifyReply;
  }
) => {
  const { req, res, bodySchema, headersSchema, paramsSchema, querySchema } =
    data;
  const errors: Record<string, any> = {};
  const validatedData: Partial<InferValidatedData<Schemas>> = {};

  // Validate headers if schema is provided
  if (headersSchema && req.headers) {
    const result = headersSchema.safeParse(req.headers);
    if (result.success) {
      validatedData.headersSchema = result.data as any;
    } else {
      errors.headers = result.error.format();
    }
  }

  // Validate body if schema is provided
  if (bodySchema && req.body) {
    const result = bodySchema.safeParse(req.body);
    if (result.success) {
      // TODO: Replace with proper typing
      validatedData.body = result.data as any;
    } else {
      errors.body = result.error.format();
    }
  }

  // Validate params if schema is provided
  if (paramsSchema && req.params) {
    const result = paramsSchema.safeParse(req.params);
    if (result.success) {
      // TODO: Replace with proper typing
      validatedData.params = result.data as any;
    } else {
      errors.params = result.error.format();
    }
  }

  // Validate query if schema is provided
  if (querySchema && req.query) {
    const result = querySchema.safeParse(req.query);
    if (result.success) {
      // TODO: Replace with proper typing
      validatedData.query = result.data as any;
    } else {
      errors.query = result.error.format();
    }
  }

  // If there are any errors, call onFailure and return a bad request
  if (Object.keys(errors).length > 0) {
    return res.badRequest();
  }

  // If validation passes, call onSuccess with validated data
  return onSuccess(
    validatedData as InferValidatedData<Schemas>,
    res as FastifyReply<
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      { Reply: ZodInfer<Schemas["replySchema"]> }
    >
  );
};
