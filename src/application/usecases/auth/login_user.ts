import "reflect-metadata";
import { singleton } from "tsyringe";
import { LoginPayloadInterface } from "../../interfaces/usecases/auth";
import UserRepository from "../../repository/UserRepository";
import HasherService from "../../../infrastructure/hasher";
import UserError from "../../errors/UserError";

@singleton()
export default class LoginUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hasher: HasherService
  ) {}

  async execute(payload: LoginPayloadInterface) {
    const user = await this.userRepo.findOneByFields(
      {
        email: payload.email,
      },
      {},
      {}
    );
    if (!user) throw new UserError("this account does not exist", 404);
    const success = await this.hasher.verifyHash(
      payload.password,
      user?.password!
    );
    if (!success) throw new UserError("incorrect password", 401);
    user.password = undefined;
    return user;
  }
}
