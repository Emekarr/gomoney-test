import HasherService from "../../infrastructure/hasher";
import Responder from "../../infrastructure/responder";
import { TokenType } from "../../infrastructure/token/contants";
import AuthTokensManager from "../../infrastructure/token/jwt";
import config from "../../config";
import { CacheRepository } from "../../infrastructure/repository";
import AdminRepository from "../repository/AdminRepository";

export const AuthMiddleware = async (ctx: {
  authToken?: string;
  responder: any;
}) => {
  const tokenHeader = ctx.authToken;
  if (typeof tokenHeader === "undefined")
    return new Responder().respond(
      "an access token is required for this route",
      null,
      401,
      false,
      null,
      ctx.responder
    );
  const bearer = tokenHeader.split(" ")[1];
  const result = await AuthTokensManager.verifyToken(bearer);
  if (result.type !== TokenType.ACCESS_TOKEN)
    return new Responder().respond(
      "invalid access token used",
      null,
      401,
      false,
      null,
      ctx.responder
    );
  if (result.iss !== config.getJWTIssuer())
    return new Responder().respond(
      "invalid access token used",
      null,
      401,
      false,
      null,
      ctx.responder
    );
  const loggedOutTokens = (await CacheRepository.findSet(
    `${result.id}-logout`
  )) as string[];
  const exists = loggedOutTokens.find((token) => {
    return JSON.parse(token).token === bearer;
  });
  if (exists)
    return new Responder().respond(
      "access denied",
      null,
      401,
      false,
      null,
      ctx.responder
    );
  let stillExists = 0;
  if (result.admin) {
    stillExists = await new AdminRepository().count({ _id: result.id });
  }
  if (stillExists === 0)
    return new Responder().respond(
      "user not found",
      null,
      404,
      false,
      null,
      ctx.responder
    );
  // append to request
  return {
    name: result.name,
    admin: result.admin,
    email: result.email,
    id: result.admin,
  };
};
