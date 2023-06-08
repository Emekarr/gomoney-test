import BaseError from "./BaseError";

export default class ApplicationError extends BaseError {
  constructor(msg: string, statusCode: number, escalate: boolean) {
    super("ApplicationError", msg, statusCode, escalate);
  }
}
