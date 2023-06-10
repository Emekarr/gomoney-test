import "reflect-metadata";
import { singleton } from "tsyringe";
import { LoginPayloadInterface } from "../../interfaces/usecases/auth";
import AdminRepository from "../../repository/AdminRepository";
import HasherService from "../../../infrastructure/hasher";
import UserError from "../../errors/UserError";

@singleton()
export default class LoginAdminUseCase {
  constructor(
    private adminRepo: AdminRepository,
    private hasher: HasherService
  ) {}

  async execute(payload: LoginPayloadInterface) {
    const admin = await this.adminRepo.findOneByFields(
      {
        email: payload.email,
      },
      {},
      {}
    );
    if (!admin) throw new UserError("this account does not exist", 404);
    const success = await this.hasher.verifyHash(
      payload.password,
      admin?.password!
    );
    if (!success) throw new UserError("incorrect password", 401);
    admin.password = undefined;
    return admin;
  }
}
