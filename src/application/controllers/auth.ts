import Admin from "../../domain/entities/admin";
import Responder from "../../infrastructure/responder";
import AuthTokensManager from "../../infrastructure/token/jwt";
import { AuthControllerInterface } from "../interfaces/controller";
import CreateAdminUseCase from "../usecases/auth/create_admin";
import { container } from "tsyringe";
import LoginAdminUseCase from "../usecases/auth/login_admin";
import { LoginPayloadInterface } from "../interfaces/usecases/auth";
import CreateUserUseCase from "../usecases/auth/create_user";
import LoginUserUseCase from "../usecases/auth/login_user";

class AuthController implements AuthControllerInterface {
  async createAdmin(ctx: { body: any; responder: any }): Promise<void> {
    const body: Admin = ctx.body;
    const admin = await container.resolve(CreateAdminUseCase).execute(body);
    const accessToken = await AuthTokensManager.generateAccessToken({
      name: admin.name,
      admin: true,
      email: admin.email,
      id: admin._id,
    });
    const refreshToken = await AuthTokensManager.generateRefreshToken({
      name: admin.name,
      admin: true,
      email: admin.email,
      id: admin._id,
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

  async createUser(ctx: { body: any; responder: any }): Promise<void> {
    const body: Admin = ctx.body;
    const user = await container.resolve(CreateUserUseCase).execute(body);
    const accessToken = await AuthTokensManager.generateAccessToken({
      name: user.name,
      admin: false,
      email: user.email,
      id: user.id,
    });
    const refreshToken = await AuthTokensManager.generateRefreshToken({
      name: user.name,
      admin: false,
      email: user.email,
      id: user.id,
    });
    new Responder().respond(
      "user acount created",
      { user, tokens: { accessToken, refreshToken } },
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
      "login successful",
      { admin, tokens: { accessToken, refreshToken } },
      200,
      true,
      null,
      ctx.responder
    );
  }

  async loginUser(ctx: {
    body: LoginPayloadInterface;
    responder: any;
  }): Promise<void> {
    const user = await container.resolve(LoginUserUseCase).execute(ctx.body);
    const accessToken = await AuthTokensManager.generateAccessToken({
      name: user.name,
      admin: false,
      email: user.email,
      id: user.id,
    });
    const refreshToken = await AuthTokensManager.generateRefreshToken({
      name: user.name,
      admin: false,
      email: user.email,
      id: user.id,
    });
    new Responder().respond(
      "login successful",
      { user, tokens: { refreshToken, accessToken } },
      200,
      true,
      null,
      ctx.responder
    );
  }
}

export default Object.freeze(new AuthController());
