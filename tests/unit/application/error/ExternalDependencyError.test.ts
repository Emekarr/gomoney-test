import { expect } from "chai";
import BaseError from "../../../../src/application/errors/BaseError";
import ExternalDependencyError from "../../../../src/application/errors/ExternalDependencyError";

describe("ExternalDependencyError Error", () => {
  test("should have the required properties", () => {
    const msg = "a new application error occured";
    const error = new ExternalDependencyError(msg);

    expect(error).to.be.instanceOf(BaseError);
    expect(error).to.be.instanceOf(Error);
    expect(error.name).to.be.equal("ExternalDependencyError");
    expect(error.message).to.be.equal(msg);
  });
});
