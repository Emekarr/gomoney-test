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

describe("Authentication Endpoint - Admin", () => {
  const payload = {
    name: "Emeka",
    email: "email@email.com",
    password: "1234!@#$qwerQWER",
  };

  test("should create admin account", async () => {
    const response = await request(app)
      .post("/api/v1/auth/admin/create")
      .send(payload);

    expect(response.status).to.be.equal(201);
    expect(response.body.message).to.be.equal("admin acount created");
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.admin.createdAt).to.exist;
    expect(response.body.data.admin.createdAt).to.be.a("string");
    expect(response.body.data.admin.updatedAt).to.exist;
    expect(response.body.data.admin.updatedAt).to.a("string");
    expect(response.body.data.admin._id).to.exist;
    expect(response.body.data.admin._id).to.be.a("string");
    expect(response.body.data.admin.name).equal(payload.name);
    expect(response.body.data.admin.email).equal(payload.email);
    expect(response.body.data.tokens.accessToken).to.exist;
    expect(response.body.data.tokens.refreshToken).to.exist;
    expect(response.body.data.tokens.accessToken).to.be.a("string");
    expect(response.body.data.tokens.refreshToken).to.be.a("string");
  });

  test("should log into admin account", async () => {
    const response = await request(app)
      .post("/api/v1/auth/admin/login")
      .send(payload);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.equal("login successful");
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.admin.createdAt).to.exist;
    expect(response.body.data.admin.createdAt).to.be.a("string");
    expect(response.body.data.admin.updatedAt).to.exist;
    expect(response.body.data.admin.updatedAt).to.a("string");
    expect(response.body.data.admin.id).to.exist;
    expect(response.body.data.admin.id).to.be.a("string");
    expect(response.body.data.admin.name).equal(payload.name);
    expect(response.body.data.admin.email).equal(payload.email);
    expect(response.body.data.tokens.accessToken).to.exist;
    expect(response.body.data.tokens.refreshToken).to.exist;
    expect(response.body.data.tokens.accessToken).to.be.a("string");
    expect(response.body.data.tokens.refreshToken).to.be.a("string");
  });

  test("should not create admin account - email exists", async () => {
    const response = await request(app)
      .post("/api/v1/auth/admin/create")
      .send(payload);

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.equal("an error occured");
    expect(response.body.success).to.be.equal(false);
    expect(response.body.errors).to.deep.equal([
      `an account already exists with email ${payload.email}`,
    ]);
    expect(response.body.data).to.be.equal(null);
  });

  test("should not create admin account - invalid email", async () => {
    payload.email = "email";
    const response = await request(app)
      .post("/api/v1/auth/admin/create")
      .send(payload);

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal("an error occured");
    expect(response.body.success).to.be.equal(false);
    expect(response.body.errors).to.deep.equal([
      '"email" must be a valid email',
    ]);
    expect(response.body.data).to.be.equal(null);
  });
});

describe("Authentication Endpoint - User", () => {
  const payload = {
    name: "Emeka",
    email: "email@email.com",
    password: "1234!@#$qwerQWER",
  };

  test("should create user account", async () => {
    const response = await request(app)
      .post("/api/v1/auth/user/create")
      .send(payload);

    expect(response.status).to.be.equal(201);
    expect(response.body.message).to.be.equal("user acount created");
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.user.createdAt).to.exist;
    expect(response.body.data.user.createdAt).to.be.a("string");
    expect(response.body.data.user.updatedAt).to.exist;
    expect(response.body.data.user.updatedAt).to.a("string");
    expect(response.body.data.user._id).to.exist;
    expect(response.body.data.user._id).to.be.a("string");
    expect(response.body.data.user.name).equal(payload.name);
    expect(response.body.data.user.email).equal(payload.email);
    expect(response.body.data.tokens.accessToken).to.exist;
    expect(response.body.data.tokens.refreshToken).to.exist;
    expect(response.body.data.tokens.accessToken).to.be.a("string");
    expect(response.body.data.tokens.refreshToken).to.be.a("string");
  });

  test("should log into user account", async () => {
    const response = await request(app)
      .post("/api/v1/auth/user/login")
      .send(payload);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.equal("login successful");
    expect(response.body.success).to.be.equal(true);
    expect(response.body.errors).to.be.equal(null);
    expect(response.body.data.user.createdAt).to.exist;
    expect(response.body.data.user.createdAt).to.be.a("string");
    expect(response.body.data.user.updatedAt).to.exist;
    expect(response.body.data.user.updatedAt).to.a("string");
    expect(response.body.data.user.id).to.exist;
    expect(response.body.data.user.id).to.be.a("string");
    expect(response.body.data.user.name).equal(payload.name);
    expect(response.body.data.user.email).equal(payload.email);
    expect(response.body.data.tokens.accessToken).to.exist;
    expect(response.body.data.tokens.refreshToken).to.exist;
    expect(response.body.data.tokens.accessToken).to.be.a("string");
    expect(response.body.data.tokens.refreshToken).to.be.a("string");
  });

  test("should not create user account - email exists", async () => {
    const response = await request(app)
      .post("/api/v1/auth/user/create")
      .send(payload);

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.equal("an error occured");
    expect(response.body.success).to.be.equal(false);
    expect(response.body.errors).to.deep.equal([
      `an account already exists with email ${payload.email}`,
    ]);
    expect(response.body.data).to.be.equal(null);
  });

  test("should not create user account - invalid email", async () => {
    payload.email = "email";
    const response = await request(app)
      .post("/api/v1/auth/user/create")
      .send(payload);

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal("an error occured");
    expect(response.body.success).to.be.equal(false);
    expect(response.body.errors).to.deep.equal([
      '"email" must be a valid email',
    ]);
    expect(response.body.data).to.be.equal(null);
  });
});
