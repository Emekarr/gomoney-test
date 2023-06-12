import { expect } from "chai";
import User from "../../../../src/domain/entities/user";

describe("User Entity", () => {
  test("should have required properties", () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const id = "0000000000";
    const email = "email@email.com";
    const name = "Emeka";

    const user: User = {
      id,
      name,
      email,
      createdAt,
      updatedAt,
    };
    expect(user.id).to.be.a("string");
    expect(user.id).to.exist;
    expect(user.email).to.exist;
    expect(user.email).to.be.a("string");
    expect(user.name).to.exist;
    expect(user.name).to.be.a("string");
    expect(user.createdAt).to.exist;
    expect(user.createdAt).to.be.instanceOf(Date);
    expect(user.updatedAt).to.exist;
    expect(user.updatedAt).to.be.instanceOf(Date);
  });
});
