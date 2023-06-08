import clogger, { Logger, transports } from "winston";
import { LoggerInterface } from "./types";
import transport from "./transport";

export default class WinstonLogger implements LoggerInterface {
  readonly logger: Logger;
  readonly level: string;

  constructor(level: string) {
    this.level = level;
    this.logger = clogger.createLogger({
      level: this.level,
      format: clogger.format.json({ space: 2 }),
      transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
        new transports.Console(),
        transport,
      ],
    });
  }

  write(msg: string, ...meta: any) {
    this.logger.log(this.level, msg, { time: new Date() }, meta);
  }
}
