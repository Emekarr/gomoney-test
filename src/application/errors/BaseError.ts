import ErrorLogger from "../../infrastructure/logger/ErrorLogger";

export default abstract class BaseError extends Error {
  constructor(
    readonly name: string,
    readonly msg: string,
    readonly statusCode: number,
    readonly escalate: boolean
  ) {
    super(msg);
    this.escalate ? this.escalateErr() : null;
  }

  private escalateErr() {
    ErrorLogger.write(this.message, {
      name: this.name,
    });
    console.log("also report to an error monitoring software like sentry");
  }
}
