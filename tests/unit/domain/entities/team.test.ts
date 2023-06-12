import Team from "../../../../src/domain/entities/team";
import { expect } from "chai";

describe("Team Entity", () => {
  test("should have required properties", () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const id = "0000000000";
    const createdBy = "0000000000";
    const name = "Emeka";
    const team: Team = {
      id,
      createdBy,
      name,
      createdAt,
      updatedAt,
    };
    expect(team.id).to.be.a("string");
    expect(team.id).to.exist;
    expect(team.createdBy).to.exist;
    expect(team.createdBy).to.be.a("string");
    expect(team.name).to.exist;
    expect(team.name).to.be.a("string");
    expect(team.createdAt).to.exist;
    expect(team.createdAt).to.be.instanceOf(Date);
    expect(team.updatedAt).to.exist;
    expect(team.updatedAt).to.be.instanceOf(Date);
  });
});
