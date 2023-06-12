import { FixtureControllerInterface } from "../interfaces/controller";
import { container } from "tsyringe";
import Responder from "../../infrastructure/responder";
import CreateFixtureUseCase from "../usecases/fixture/create_fixture";
import FetchFixturesUseCase from "../usecases/fixture/fetch_fixtures";
import SearchFixturesUseCase from "../usecases/fixture/search_fixtures";
import UserError from "../errors/UserError";
import DeleteFixturesUseCase from "../usecases/fixture/delete_fixtures";
import Team from "../../domain/entities/team";
import UpdateFixturesUseCase from "../usecases/fixture/update_fixtures";
import { generateFixtureURL } from "../services/fixture";
import FetchFixtureByIDUseCase from "../usecases/fixture/fetch_fixture_by_id";

class FixtureController implements FixtureControllerInterface {
  async fetchFixtureByURL(ctx: { responder: any; id: string }): Promise<void> {
    const fixture = await container
      .resolve(FetchFixtureByIDUseCase)
      .execute(ctx.id);
    new Responder().respond(
      "fixture fetched",
      fixture,
      200,
      true,
      null,
      ctx.responder
    );
  }
  async updateFixtures(ctx: {
    responder: any;
    query: { id: string; adminID: string };
    body: Partial<Team>;
  }): Promise<void> {
    if (!ctx.query.id) throw new UserError("id is required", 400);
    await container
      .resolve(UpdateFixturesUseCase)
      .execute(ctx.query.id, ctx.query.adminID, ctx.body);
    new Responder().respond(
      "fixture updated",
      null,
      200,
      true,
      null,
      ctx.responder
    );
  }

  async createFixture(ctx: {
    responder: any;
    body: any;
    adminID: string;
  }): Promise<void> {
    const fixture = await container
      .resolve(CreateFixtureUseCase)
      .execute(ctx.body, ctx.adminID);
    const populatedWithURL = {
      ...fixture,
      url: generateFixtureURL(fixture.id),
    };
    fixture.url = generateFixtureURL(fixture.id);
    new Responder().respond(
      "fixture created",
      populatedWithURL,
      201,
      true,
      null,
      ctx.responder
    );
  }

  async fetchFixture(ctx: {
    responder: any;
    query: {
      lastID: string;
      limit: number;
      all: boolean;
      adminID: string;
      completed: boolean;
    };
  }): Promise<void> {
    const fixtures = await container
      .resolve(FetchFixturesUseCase)
      .execute(
        ctx.query.lastID,
        ctx.query.limit,
        ctx.query.all,
        ctx.query.adminID,
        ctx.query.completed
      );
    const populatedWithURL = fixtures.map((f) => {
      const url = generateFixtureURL(f._id);
      return {
        ...f,
        url,
      };
    });
    new Responder().respond(
      "fixture fetched",
      populatedWithURL,
      200,
      true,
      null,
      ctx.responder
    );
  }

  async searchFixtures(ctx: {
    responder: any;
    query: { limit: number };
    body: {
      name: string;
    };
  }): Promise<void> {
    const fixtures = await container
      .resolve(SearchFixturesUseCase)
      .execute(ctx.query.limit, ctx.body.name);
    const populatedWithURL = fixtures.map((f) => {
      const url = generateFixtureURL(f._id);
      return {
        ...f,
        url,
      };
    });
    new Responder().respond(
      "search successful",
      populatedWithURL,
      200,
      true,
      null,
      ctx.responder
    );
  }

  async deleteFixturesUseCase(ctx: {
    id: string;
    adminID: string;
    responder: any;
  }): Promise<void> {
    if (!ctx.id) throw new UserError("id is required", 400);
    await container.resolve(DeleteFixturesUseCase).execute(ctx.id, ctx.adminID);
    new Responder().respond(
      "fixture deleted",
      null,
      200,
      true,
      null,
      ctx.responder
    );
  }
}

export default Object.freeze(new FixtureController());
