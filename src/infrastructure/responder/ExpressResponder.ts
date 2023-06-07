import ResponderInterface from "./ResponderInterface";
import { Response } from "express";

export default class ExpressResponder implements ResponderInterface {
  respond(
    message: string,
    data: any,
    statusCode: number,
    success: boolean,
    errors: any[] | null,
    ctx: Response
  ): void {
    ctx.status(statusCode).json({
      message,
      data,
      success,
      errors,
    });
  }
}
