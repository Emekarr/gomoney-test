import Admin from "../../domain/entities/admin";
import Responder from "../../infrastructure/responder";
import AuthTokensManager from "../../infrastructure/token/jwt";
import AuthControllerInterface from "../interfaces/controller";
import CreateAdminUseCase from "../usecases/auth/create_admin";
import { container } from "tsyringe";

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

  loginAdmin(ctx: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default Object.freeze(new AuthController());
