import { expect } from "chai";

import Admin from "../../../../src/domain/entities/admin";

describe("Admin Entity Test", () => {
  test("should have the required properties", () => {
    const id = "0000000";
    const name = "UserName";
    const email = "email@email.com";
    const createdAt = new Date();
    const updatedAt = new Date();

    const admin: Admin = {
      id,
      name,
      email,
      createdAt,
      updatedAt,
    };

    expect(admin.id).to.exist;
    expect(admin.id).to.be.a("string");
    expect(admin.name).to.exist;
    expect(admin.name).to.be.a("string");
    expect(admin.email).to.exist;
    expect(admin.name).to.be.a("string");
    expect(admin.createdAt).to.exist;
    expect(admin.createdAt).to.be.instanceOf(Date);
    expect(admin.updatedAt).to.exist;
    expect(admin.updatedAt).to.be.instanceOf(Date);
  });
});
