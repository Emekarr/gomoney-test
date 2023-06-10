import Admin from "../../domain/entities/admin";
import Responder from "../../infrastructure/responder";
import AuthTokensManager from "../../infrastructure/token/jwt";
import AuthControllerInterface from "../interfaces/controller";
import CreateAdminUseCase from "../usecases/auth/create_admin";
import { container } from "tsyringe";
import LoginAdminUseCase from "../usecases/auth/login_admin";
import { LoginPayloadInterface } from "../interfaces/usecases/auth";

class AuthController implements AuthControllerInterface {
  async createAdmin(ctx: { body: any; responder: any }): Promise<void> {
    const body: Admin = ctx.body;
    const admin = await container.resolve(CreateAdminUseCase).execute(body);
    const accessToken = await AuthTokensManager.generateAccessToken({
      name: admin.name,
      admin: true,
      email: admin.email,
      id: admin.id,
    });
    const refreshToken = await AuthTokensManager.generateRefreshToken({
      name: admin.name,
      admin: true,
      email: admin.email,
      id: admin.id,
    });
    new Responder().respond(
      "admin acount created",
      { admin, tokens: { accessToken, refreshToken } },
      201,
      true,
      null,
      ctx.responder
    );
  }

  async loginAdmin(ctx: {
    body: LoginPayloadInterface;
    responder: any;
  }): Promise<void> {
    const admin = await container.resolve(LoginAdminUseCase).execute(ctx.body);
    new Responder().respond(
      "login successful",
      admin,
      200,
      true,
      null,
      ctx.responder
    );
  }
}

export default Object.freeze(new AuthController());
