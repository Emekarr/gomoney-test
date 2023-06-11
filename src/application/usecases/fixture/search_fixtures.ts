import FixtureRepository from "../../repository/FixtureRepository";
import { singleton } from "tsyringe";

@singleton()
export default class SearchFixturesUseCase {
  constructor(private fixtureRepo: FixtureRepository) {}

  async execute(limit: number, name: string) {
    const fixtures = await this.fixtureRepo.findManyByFields(
      {
        name: { $regex: new RegExp(name, "i") },
      },
      {},
      { limit: limit ?? 15 }
    );
    return fixtures;
  }
}
