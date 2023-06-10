import { TeamControllerInterface } from "../interfaces/controller";
import { container } from "tsyringe";
import CreateTeamUseCase from "../usecases/team/create_team";
import Responder from "../../infrastructure/responder";

class TeamController implements TeamControllerInterface {
  async createTeam(ctx: {
    responder: any;
    body: any;
    id: string;
  }): Promise<void> {
    ctx.body.createdBy = ctx.id;
    const team = await container.resolve(CreateTeamUseCase).execute(ctx.body);
    new Responder().respond(
      "team created",
      team,
      201,
      true,
      null,
      ctx.responder
    );
  }
}

export default Object.freeze(new TeamController());
