import FixtureRepository from "../../repository/FixtureRepository";
import { singleton } from "tsyringe";

@singleton()
export default class FetchFixturesUseCase {
  constructor(private fixtureRepo: FixtureRepository) {}

  async execute(lastID: string, limit: number, all: boolean, adminID: string) {
    const teams = await this.fixtureRepo.findManyByFields(
      {
        _id: (() => {
          return lastID ? { $lt: lastID } : { $gt: "000000000000000000000000" };
        })(),
        createdBy: all ? { $exists: true } : adminID,
      },
      {},
      { limit: limit ?? 15, sort: { _id: -1 } }
    );
    return teams;
  }
}
