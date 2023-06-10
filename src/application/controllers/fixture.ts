import { FixtureControllerInterface } from "../interfaces/controller";
import { container } from "tsyringe";
import Responder from "../../infrastructure/responder";
import CreateFixtureUseCase from "../usecases/fixture/create_fixture";

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
}

export default Object.freeze(new FixtureController());
