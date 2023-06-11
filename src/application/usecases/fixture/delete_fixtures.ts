import UserError from "../../errors/UserError";
import FixtureRepository from "../../repository/FixtureRepository";
import { singleton } from "tsyringe";

@singleton()
export default class DeleteFixturesUseCase {
  constructor(private fixturesRepo: FixtureRepository) {}

  async execute(id: string, adminID: string) {
    const exists = await this.fixturesRepo.count({
      _id: id,
      createdBy: adminID,
    });
    if (exists === 0) throw new UserError("resource not found", 404);
    await this.fixturesRepo.deleteByID(id, {});
  }
}
