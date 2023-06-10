import UserError from "../../errors/UserError";
import TeamRepository from "../../repository/TeamRepository";
import { singleton } from "tsyringe";
import ClassValidator from "../../validator";
import { UpdateTeamValidatorSchema } from "../validators/team";
import Team from "../../../domain/entities/team";

@singleton()
export default class UpdateTeamsUseCase {
  constructor(private teamRepo: TeamRepository) {}

  async execute(id: string, adminID: string, payload: Partial<Team>) {
    const result = ClassValidator.validate<Team>(
      UpdateTeamValidatorSchema,
      payload
    );
    if (result.err) {
      throw new UserError(result.err.message, 400);
    }
    console.log(id, adminID);
    const exists = await this.teamRepo.count({
      _id: id,
      createdBy: adminID,
    });
    if (exists === 0) throw new UserError("resource not found", 404);
    await this.teamRepo.updateByID(id, result.payload!, {});
  }
}
