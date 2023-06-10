import ErrorLogger from "../../infrastructure/logger/ErrorLogger";
import Responder from "../../infrastructure/responder";
import BaseError from "../errors/BaseError";

const baseErrors = ["ApplicationError", "UserError", "ExternalDependencyError"];

export const ErrorMiddleware = (ctx: {
  responder: any;
  err: Error | BaseError;
}) => {
  ErrorLogger.write(`${ctx.err.name} - ${ctx.err.message}`);
  if (baseErrors.includes(ctx.err.name)) {
    new Responder().respond(
      "an error occured",
      null,
      (ctx.err as BaseError).statusCode,
      false,
      [ctx.err.message],
      ctx.responder
    );
    if ((ctx.err as BaseError).escalate) {
      console.log("alert on sentry");
    }
  } else {
    new Responder().respond(
      "an error occured",
      null,
      500,
      false,
      [ctx.err.message],
      ctx.responder
    );
  }
};
