import request from "supertest";
import { expect } from "chai";
import infrastructure from "../../src/infrastructure";

import mongodb from "../../src/infrastructure/database/connection/datastore/mongodb";
const app = infrastructure();

beforeAll(async () => {
  await mongodb.dropDB();
});

afterAll(async () => {
  await mongodb.dropDB();
});

describe("Team Endpoint", () => {
  const teamPayload = {
    name: "Current Name",
  };

  let admin: any;

  let teamData: any;

  test("create team", async () => {
    const adminPayload = {
      name: "Emeka",
      email: "emeka@email.com",
      password: "1234!@#$qwerQWER",
    };
    admin = (
      await request(app).post("/api/v1/auth/admin/create").send(adminPayload)
    ).body;

    const response = await request(app)
      .post("/api/v1/team/create")
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send(teamPayload);

    teamData = response.body.data;

    expect(response.body.message).to.be.equal("team created");
    expect(response.status).to.be.equal(201);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.name).to.be.equal(teamPayload.name);
    expect(response.body.data.createdBy).to.be.equal(admin.data.admin._id);
  });

  test("should not create team - no name", async () => {
    const response = await request(app)
      .post("/api/v1/team/create")
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({});

    expect(response.body.message).to.be.equal("an error occured");
    expect(response.body.data).to.be.equal(null);
    expect(response.status).to.be.equal(400);
    expect(response.body.success).to.be.equal(false);
    expect(response.body.errors).to.be.deep.equal([`"name" is required`]);
  });

  test("update team", async () => {
    const response = await request(app)
      .patch(`/api/v1/team/update?id=${teamData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: "New Name" });

    expect(response.body.message).to.be.equal("team updated");
    expect(response.status).to.be.equal(200);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data).to.be.deep.equal(undefined);
  });

  test("should not update team - no name", async () => {
    const response = await request(app)
      .patch(`/api/v1/team/update?id=${teamData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: null });

    expect(response.body.message).to.be.equal("an error occured");
    expect(response.status).to.be.equal(400);
    expect(response.body.success).to.be.equal(false);
    expect(response.body.errors).to.be.deep.equal(['"name" must be a string']);
    expect(response.body.data).to.be.deep.equal(null);
  });

  test("fetch teams", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post("/api/v1/team/create")
        .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
        .send({ name: "Unique" });
    }
    const limit = 3;
    const response = await request(app)
      .get(`/api/v1/team/fetch?limit=${limit}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: null });

    expect(response.body.message).to.be.equal("teams fetched");
    expect(response.status).to.be.equal(200);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.length).to.be.equal(limit);
  });

  test("search teams", async () => {
    const limit = 3;
    const response = await request(app)
      .get(`/api/v1/team/search?limit=${limit}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: "Unique" });

    expect(response.body.message).to.be.equal("search successful");
    expect(response.status).to.be.equal(200);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.length).to.be.equal(limit);
  });

  test("delete teams", async () => {
    const response = await request(app)
      .delete(`/api/v1/team/delete?id=${teamData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: null });

    const updateDeletedResponseAttempt = await request(app)
      .patch(`/api/v1/team/update?id=${teamData._id}`)
      .set("Authorization", `Bearer ${admin.data.tokens.accessToken}`)
      .send({ name: "New Name" });

    expect(updateDeletedResponseAttempt.body.message).to.be.equal(
      "an error occured"
    );
    expect(response.body.message).to.be.equal("team deleted");
    expect(response.status).to.be.equal(200);
    expect(updateDeletedResponseAttempt.status).to.be.equal(404);
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(updateDeletedResponseAttempt.body.errors).to.be.deep.equal([
      "resource not found",
    ]);
  });
});
