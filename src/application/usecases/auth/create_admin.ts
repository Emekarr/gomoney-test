import Admin from "../../../domain/entities/admin";
import UserError from "../../errors/UserError";
import AdminRepository from "../../repository/AdminRepository";
import ClassValidator from "../../validator";
import { AdminValidatorSchema } from "../validators/admin";

import "reflect-metadata";
import { singleton } from "tsyringe";

@singleton()
export default class CreateAdminUseCase {
  constructor(private adminRepo: AdminRepository) {}

  async execute(payload: Admin) {
    const result = ClassValidator.validate<Admin>(
      AdminValidatorSchema,
      payload
    );
    if (result.err) {
      throw new UserError(result.err.message, 400);
    }
    return await this.adminRepo.createEntry(result.payload!, {});
  }
}
