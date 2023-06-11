import Fixture from "../../../domain/entities/fixture";
import UserError from "../../errors/UserError";
import FixtureRepository from "../../repository/FixtureRepository";
import TeamRepository from "../../repository/TeamRepository";
import ClassValidator from "../../validator";
import { FixtureValidatorSchema } from "../validators/fixture";
import { singleton } from "tsyringe";

@singleton()
export default class CreateFixtureUseCase {
  constructor(
    private fixtureRepo: FixtureRepository,
    private teamRepository: TeamRepository
  ) {}

  async execute(payload: Fixture, adminID: string) {
    const [team1, team2] = await Promise.all([
      this.teamRepository.findOneByFields(
        {
          _id: payload.teamOneID,
          createdBy: adminID,
        },
        { name: true },
        {}
      ),
      this.teamRepository.findOneByFields(
        {
          _id: payload.teamTwoID,
          createdBy: adminID,
        },
        { name: true },
        {}
      ),
    ]);
    if (!team1) throw new UserError("team1 not found", 404);
    if (!team2) throw new UserError("team2 not found", 404);
    payload.teamOneName = team1?.name;
    payload.teamTwoName = team2?.name;
    payload.createdBy = adminID;
    const result = ClassValidator.validate<Fixture>(
      FixtureValidatorSchema,
      payload
    );
    if (result.err) {
      throw new UserError(result.err.message, 400);
    }
    return await this.fixtureRepo.createEntry(
      { ...result.payload!, completed: false },
      {}
    );
  }
}
