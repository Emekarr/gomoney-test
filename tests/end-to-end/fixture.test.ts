import request from "supertest";
import { expect } from "chai";
import infrastructure from "../../src/infrastructure";
import config from "../../src/config";

import mongodb from "../../src/infrastructure/database/connection/datastore/mongodb";
const app = infrastructure();

beforeAll(async () => {
  await mongodb.dropDB();
});

afterAll(async () => {
  await mongodb.dropDB();
});

describe("Fixture Endpoints", () => {
  const fixturePayload = {
    name: "Kano Pillers vs Arsenal",
    teamOneID: null,
    teamTwoID: null,
  };
  let team1: any;
  let team2: any;
  let admin: any;
  let fixtureData: any;

  test("create fixture", async () => {
    const adminPayload = {
      name: "Emeka",
      email: "emeka@email.com",
      password: "1234!@#$qwerQWER",
    };

    admin = (
      await request(app).post("/api/v1/auth/admin/create").send(adminPayload)
    ).body;

    for (let i = 1; i <= 2; i++) {
      const response = await request(app)
        .post("/api/v1/team/create")
        .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
        .send({ name: `team${i}` });
      if (i === 1) team1 = response.body.data;
      if (i === 2) team2 = response.body.data;
    }

    fixturePayload.teamOneID = team1._id;
    fixturePayload.teamTwoID = team2._id;
    const fixture = await request(app)
      .post("/api/v1/fixture/create")
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send(fixturePayload);
    fixtureData = fixture.body.data;
    expect(fixture.body.success).to.equal(true);
    expect(fixture.status).to.equal(201);
    expect(fixture.body.message).to.equal("fixture created");
    expect(fixture.body.errors).to.deep.equal(null);
    expect(fixture.body.data.teamOneID).to.equal(team1._id);
    expect(fixture.body.data.teamOneName).to.equal(team1.name);
    expect(fixture.body.data.teamTwoName).to.equal(team2.name);
    expect(fixture.body.data.teamTwoID).to.equal(team2._id);
  });

  test("fetch fixture", async () => {
    const limit = 6;

    for (let i = 0; i < 6; i++) {
      await request(app)
        .post("/api/v1/fixture/create")
        .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
        .send(fixturePayload);
    }

    const fixtures = await request(app)
      .get(`/api/v1/fixture/fetch?limit=${limit}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send(fixturePayload);
    expect(fixtures.body.success).to.equal(true);
    expect(fixtures.status).to.equal(200);
    expect(fixtures.body.message).to.equal("fixture fetched");
    expect(fixtures.body.errors).to.deep.equal(null);
    expect(fixtures.body.data.length).to.equal(limit);
  });

  test("search fixture", async () => {
    const limit = 6;

    for (let i = 0; i < 6; i++) {
      await request(app)
        .post("/api/v1/fixture/create")
        .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
        .send({ name: "Arsen" });
    }

    const fixtures = await request(app)
      .get(`/api/v1/fixture/search?limit=${limit}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send(fixturePayload);
    expect(fixtures.body.success).to.equal(true);
    expect(fixtures.status).to.equal(200);
    expect(fixtures.body.message).to.equal("search successful");
    expect(fixtures.body.errors).to.deep.equal(null);
    expect(fixtures.body.data.length).to.equal(limit);
  });

  test("update fixture", async () => {
    const response = await request(app)
      .patch(`/api/v1/fixture/update?id=${fixtureData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: "New Name" });

    expect(response.body.message).to.be.equal("fixture updated");
    expect(response.status).to.be.equal(200);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data).to.be.deep.equal(null);
  });

  test("delete fixtures", async () => {
    const response = await request(app)
      .delete(`/api/v1/fixture/delete?id=${fixtureData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: null });

    const updateDeletedResponseAttempt = await request(app)
      .patch(`/api/v1/team/update?id=${fixtureData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: "New Name" });

    expect(updateDeletedResponseAttempt.body.message).to.be.equal(
      "an error occured"
    );
    expect(response.body.message).to.be.equal("fixture deleted");
    expect(response.status).to.be.equal(200);
    expect(updateDeletedResponseAttempt.status).to.be.equal(404);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(updateDeletedResponseAttempt.body.errors).to.be.deep.equal([
      "resource not found",
    ]);
  });
});
