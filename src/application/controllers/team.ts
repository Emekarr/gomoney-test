import { TeamControllerInterface } from "../interfaces/controller";
import { container } from "tsyringe";
import CreateTeamUseCase from "../usecases/team/create_team";
import Responder from "../../infrastructure/responder";
import FetchTeamsUseCase from "../usecases/team/fetch_teams";

class TeamController implements TeamControllerInterface {
  async fetchTeam(ctx: {
    responder: any;
    query: { lastID: string; limit: number };
    body: {
      name: string;
    };
  }): Promise<void> {
    const teams = await container
      .resolve(FetchTeamsUseCase)
      .execute(ctx.query.lastID, ctx.query.limit, ctx.body.name);
    new Responder().respond(
      "teams fetched",
      teams,
      200,
      true,
      null,
      ctx.responder
    );
  }

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
