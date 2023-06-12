import FixtureRepository from "../../repository/FixtureRepository";
import { singleton } from "tsyringe";

@singleton()
export default class FetchFixtureByIDUseCase {
  constructor(private fixtureRepo: FixtureRepository) {}

  async execute(id: string) {
    const fixture = await this.fixtureRepo.findByID(id, {}, {});
    return fixture;
  }
}
