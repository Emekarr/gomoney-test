import { expect } from "chai";

import Fixture from "../../../../src/domain/entities/fixture";

describe("Fixture Entity Test", () => {
  test("should have required properties", () => {
    const url = "http://test.com";
    const createdAt = new Date();
    const updatedAt = new Date();
    const id = "0000000000";
    const createdBy = "0000000000";
    const name = "Emeka";
    const completed = false;
    const teamOneName = "Team1";
    const teamOneID = "0000000000";
    const teamTwoName = "Team2";
    const teamTwoID = "0000000000";
    const fixture: Partial<Fixture> = {
      url,
      id,
      createdBy,
      name,
      completed,
      teamOneName,
      teamOneID,
      teamTwoName,
      teamTwoID,
      createdAt,
      updatedAt,
    };
    expect(fixture.url).to.exist;
    expect(fixture.url).to.be.a("string");
    expect(fixture.id).to.exist;
    expect(fixture.id).to.be.a("string");
    expect(fixture.createdBy).to.exist;
    expect(fixture.createdBy).to.be.a("string");
    expect(fixture.name).to.exist;
    expect(fixture.name).to.be.a("string");
    expect(fixture.completed).to.exist;
    expect(fixture.completed).to.be.a('boolean');
    expect(fixture.teamOneID).to.exist;
    expect(fixture.teamOneID).to.be.a("string");
    expect(fixture.teamOneName).to.exist;
    expect(fixture.teamOneName).to.be.a("string");
    expect(fixture.teamTwoID).to.exist;
    expect(fixture.teamTwoName).to.be.a("string");
    expect(fixture.createdAt).to.exist;
    expect(fixture.createdAt).to.be.instanceOf(Date);
    expect(fixture.updatedAt).to.exist;
    expect(fixture.updatedAt).to.be.instanceOf(Date);
  });
});
