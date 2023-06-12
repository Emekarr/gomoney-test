import { expect } from "chai";
import ApplicationError from "../../../../src/application/errors/ApplicationError";
import BaseError from "../../../../src/application/errors/BaseError";

describe("Base Error", () => {
  test("should have the required properties", () => {
    const msg = "a new application error occured";
    const statusCode = 500;
    const escalate = false;
    const error = new ApplicationError(msg, statusCode, escalate);

    expect(error).to.be.instanceOf(BaseError);
    expect(error).to.be.instanceOf(Error);
    expect(error.name).to.be.equal("ApplicationError");
    expect(error.message).to.be.equal(msg);
    expect(error.statusCode).to.equal(statusCode);
    expect(error.escalate).to.equal(escalate);
  });
});
