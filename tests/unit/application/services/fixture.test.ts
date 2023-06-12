import { expect } from "chai";
import { generateFixtureURL } from "../../../../src/application/services/fixture";
import config from "../../../../src/config";

describe("Fixture Service", () => {
  test("generate appropriate fixture url", () => {
    const id = "1234567890";
    const generatedURL = generateFixtureURL(id);
    expect(generatedURL).to.be.equal(
      `${config.getClientOrigin()}/api/v1/fixture/${id}`
    );
  });
});
