import UserError from "../../errors/UserError";
import TeamRepository from "../../repository/TeamRepository";
import { singleton } from "tsyringe";

@singleton()
export default class DeleteTeamsUseCase {
  constructor(private teamRepo: TeamRepository) {}

  async execute(id: string, adminID: string) {
    const exists = await this.teamRepo.count({
      _id: id,
      createdBy: adminID,
    });
    if (exists === 0) throw new UserError("resource not found", 404);
    await this.teamRepo.deleteByID(id, {});
  }
}
