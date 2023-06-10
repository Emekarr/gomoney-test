import Team from "../../../domain/entities/team";
import TeamRepository from "../../repository/TeamRepository";
import { singleton } from "tsyringe";
import { TeamValidatorSchema } from "../validators/team";
import ClassValidator from "../../validator";
import UserError from "../../errors/UserError";

@singleton()
export default class CreateTeamUseCase {
  constructor(private teamRepo: TeamRepository) {}

  async execute(payload: Team) {
    const result = ClassValidator.validate<Team>(TeamValidatorSchema, payload);
    if (result.err) {
      throw new UserError(result.err.message, 400);
    }
    return await this.teamRepo.createEntry(result.payload!, {});
  }
}
