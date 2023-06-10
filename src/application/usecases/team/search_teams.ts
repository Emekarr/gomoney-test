import TeamRepository from "../../repository/TeamRepository";
import { singleton } from "tsyringe";

@singleton()
export default class SearchTeamsUseCase {
  constructor(private teamRepo: TeamRepository) {}

  async execute(limit: number, name: string) {
    const teams = await this.teamRepo.findManyByFields(
      {
        name: { $regex: new RegExp(name, "i") },
      },
      {},
      { limit: limit ?? 15 }
    );
    return teams;
  }
}
