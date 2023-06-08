import BaseError from "./BaseError";

export default class UserError extends BaseError {
  constructor(msg: string, statusCode: number) {
    super("UserError", msg, statusCode, false);
  }
}
