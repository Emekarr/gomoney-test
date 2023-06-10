import Admin from "../../../domain/entities/admin";
import UserError from "../../errors/UserError";
import AdminRepository from "../../repository/AdminRepository";
import ClassValidator from "../../validator";
import { AdminValidatorSchema } from "../validators/admin";
import HasherService from "../../../infrastructure/hasher";

import "reflect-metadata";
import { singleton } from "tsyringe";

@singleton()
export default class CreateAdminUseCase {
  constructor(
    private adminRepo: AdminRepository,
    private hasher: HasherService
  ) {}

  async execute(payload: Admin) {
    const result = ClassValidator.validate<Admin>(
      AdminValidatorSchema,
      payload
    );
    if (result.err) {
      throw new UserError(result.err.message, 400);
    }
    result.payload!.password = await this.hasher.hash(
      result.payload!.password!
    );
    let admin = await this.adminRepo.createEntry(result.payload!, {});
    admin.password = undefined;
    return admin;
  }
}
