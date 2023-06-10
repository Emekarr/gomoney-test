import User from "../../../domain/entities/user";
import UserError from "../../errors/UserError";
import UserRepository from "../../repository/UserRepository";
import ClassValidator from "../../validator";
import { UserValidatorSchema } from "../validators/user";
import HasherService from "../../../infrastructure/hasher";

import "reflect-metadata";
import { singleton } from "tsyringe";

@singleton()
export default class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hasher: HasherService
  ) {}

  async execute(payload: User) {
    const result = ClassValidator.validate<User>(UserValidatorSchema, payload);
    if (result.err) {
      throw new UserError(result.err.message, 400);
    }
    const exists = await this.userRepo.count({ email: result.payload?.email });
    if (exists !== 0)
      throw new UserError(
        `an account already exists with email ${result.payload?.email}`,
        409
      );
    result.payload!.password = await this.hasher.hash(
      result.payload!.password!
    );
    let user = await this.userRepo.createEntry(result.payload!, {});
    user.password = undefined;
    return user;
  }
}
