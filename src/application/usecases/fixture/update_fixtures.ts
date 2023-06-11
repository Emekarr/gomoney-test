import UserError from "../../errors/UserError";
import FixtureRepository from "../../repository/FixtureRepository";
import { singleton } from "tsyringe";
import ClassValidator from "../../validator";
import { UpdateFixtureValidatorSchema } from "../validators/fixture";
import Fixture from "../../../domain/entities/fixture";
import TeamRepository from "../../repository/TeamRepository";

@singleton()
export default class UpdateFixturesUseCase {
  constructor(
    private fixturesRepo: FixtureRepository,
    private teamRepository: TeamRepository
  ) {}

  async execute(id: string, adminID: string, payload: Partial<Fixture>) {
    const exists = await this.fixturesRepo.findOneByFields(
      {
        _id: id,
        createdBy: adminID,
      },
      { teamOneID: true, teamTwoID: true },
      {}
    );
    if (exists === null) throw new UserError("resource not found", 404);
    if (payload.teamOneID && payload.teamOneID === exists.teamTwoID.toString())
      throw new UserError("new team 1 is same as current team 2", 422);
    if (payload.teamTwoID && payload.teamTwoID === exists.teamOneID.toString())
      throw new UserError("new team 2 is same as current team 1", 422);
    const teamSearchJobs: Promise<any>[] = [];
    if (payload.teamOneID) {
      teamSearchJobs.push(
        this.teamRepository.findOneByFields(
          {
            _id: payload.teamOneID,
            createdBy: adminID,
          },
          { name: true },
          {}
        )
      );
    }
    if (payload.teamTwoID) {
      teamSearchJobs.push(
        this.teamRepository.findOneByFields(
          {
            _id: payload.teamTwoID,
            createdBy: adminID,
          },
          { name: true },
          {}
        )
      );
    }
    const [team1, team2] = await Promise.all(teamSearchJobs);
    if (payload.teamOneID && !team1)
      throw new UserError("team1 not found", 404);
    if (payload.teamTwoID && !team2)
      throw new UserError("team2 not found", 404);
    if (payload.teamOneID) payload.teamOneName = team1?.name;
    if (payload.teamTwoID) payload.teamTwoName = team2?.name;
    const result = ClassValidator.validate<Fixture>(
      UpdateFixtureValidatorSchema,
      payload
    );
    if (result.err) {
      throw new UserError(result.err.message, 422);
    }
    await this.fixturesRepo.updateByID(id, result.payload!, {});
  }
}
