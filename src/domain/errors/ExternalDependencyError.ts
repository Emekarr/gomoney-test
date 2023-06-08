import BaseError from "./BaseError";

export default class ExternalDependencyError extends BaseError {
  constructor(msg: string) {
    super("ExternalDependencyError", msg, 503, true);
  }
}
