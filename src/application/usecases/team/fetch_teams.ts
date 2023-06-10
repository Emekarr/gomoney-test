import TeamRepository from "../../repository/TeamRepository";
import { singleton } from "tsyringe";

@singleton()
export default class FetchTeamsUseCase {
  constructor(private teamRepo: TeamRepository) {}

  async execute(lastID: string, limit: number) {
    const teams = await this.teamRepo.findManyByFields(
      {
        _id: (() => {
          return lastID ? { $lt: lastID } : { $gt: "000000000000000000000000" };
        })(),
      },
      {},
      { limit: limit ?? 15, sort: { _id: -1 } }
    );
    return teams;
  }
}
