import { expect } from "chai";
import BaseError from "../../../../src/application/errors/BaseError";
import UserError from "../../../../src/application/errors/UserError";

describe("User Error", () => {
  test("should have the required properties", () => {
    const msg = "a new application error occured";
    const statusCode = 500;
    const error = new UserError(msg, statusCode);

    expect(error).to.be.instanceOf(BaseError);
    expect(error).to.be.instanceOf(Error);
    expect(error.name).to.be.equal("UserError");
    expect(error.message).to.be.equal(msg);
    expect(error.statusCode).to.equal(statusCode);
  });
});
