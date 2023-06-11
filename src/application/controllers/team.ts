import { TeamControllerInterface } from "../interfaces/controller";
import { container } from "tsyringe";
import CreateTeamUseCase from "../usecases/team/create_team";
import Responder from "../../infrastructure/responder";
import FetchTeamsUseCase from "../usecases/team/fetch_teams";
import DeleteTeamsUseCase from "../usecases/team/delete_teams";
import UserError from "../errors/UserError";
import UpdateTeamsUseCase from "../usecases/team/update_team";
import Team from "../../domain/entities/team";
import SearchTeamsUseCase from "../usecases/team/search_teams";

class TeamController implements TeamControllerInterface {
  async updateTeam(ctx: {
    responder: any;
    query: { id: string; adminID: string };
    body: Partial<Team>;
  }): Promise<void> {
    if (!ctx.query.id) throw new UserError("id is required", 400);
    const team = await container
      .resolve(UpdateTeamsUseCase)
      .execute(ctx.query.id, ctx.query.adminID, ctx.body);
    new Responder().respond(
      "team updated",
      team,
      200,
      true,
      null,
      ctx.responder
    );
  }
  async deleteTeamsUseCase(ctx: {
    id: string;
    adminID: string;
    responder: any;
  }): Promise<void> {
    if (!ctx.id) throw new UserError("id is required", 400);
    await container.resolve(DeleteTeamsUseCase).execute(ctx.id, ctx.adminID);
    new Responder().respond(
      "team deleted",
      null,
      200,
      true,
      null,
      ctx.responder
    );
  }

  async fetchTeam(ctx: {
    responder: any;
    query: { lastID: string; limit: number; all: boolean; adminID: string };
  }): Promise<void> {
    const teams = await container
      .resolve(FetchTeamsUseCase)
      .execute(
        ctx.query.lastID,
        ctx.query.limit,
        ctx.query.all,
        ctx.query.adminID
      );
    new Responder().respond(
      "teams fetched",
      teams,
      200,
      true,
      null,
      ctx.responder
    );
  }

  async searchTeam(ctx: {
    responder: any;
    query: { limit: number };
    body: {
      name: string;
    };
  }): Promise<void> {
    const teams = await container
      .resolve(SearchTeamsUseCase)
      .execute(ctx.query.limit, ctx.body.name);
    new Responder().respond(
      "search successful",
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
