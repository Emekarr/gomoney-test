import { FixtureControllerInterface } from "../interfaces/controller";
import { container } from "tsyringe";
import Responder from "../../infrastructure/responder";
import CreateFixtureUseCase from "../usecases/fixture/create_fixture";
import FetchFixturesUseCase from "../usecases/fixture/fetch_fixtures";

class FixtureController implements FixtureControllerInterface {
  async createFixture(ctx: {
    responder: any;
    body: any;
    adminID: string;
  }): Promise<void> {
    const fixture = await container
      .resolve(CreateFixtureUseCase)
      .execute(ctx.body, ctx.adminID);
    new Responder().respond(
      "fixture created",
      fixture,
      201,
      true,
      null,
      ctx.responder
    );
  }

  async fetchFixture(ctx: {
    responder: any;
    query: { lastID: string; limit: number; all: boolean; adminID: string };
  }): Promise<void> {
    const fixtures = await container
      .resolve(FetchFixturesUseCase)
      .execute(
        ctx.query.lastID,
        ctx.query.limit,
        ctx.query.all,
        ctx.query.adminID
      );
    new Responder().respond(
      "fixture fetched",
      fixtures,
      200,
      true,
      null,
      ctx.responder
    );
  }
}

export default Object.freeze(new FixtureController());
