import ServerInterface from "./ServerInterface";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import RateLimiter from "./ratelimiter/RateLimiter";
import CORS from "./cors/CORS";
import Responder from "./responder";
import config from "../config";
import InfoLogger from "./logger/InfoLogger";
import ExpressRouter from "./routes/express";
import { ErrorMiddleware } from "../application/middleware/error";

export default class ExpressServer implements ServerInterface {
  start(): any {
    const server = express();

    server.use(morgan("combined"));

    // rate limiter
    server.use(
      RateLimiter.init(10 * 60 * 1000, 30, {
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
          new Responder().respond(
            "slow down! you have been rate limited",
            null,
            429,
            false,
            null,
            res
          );
          return;
        },
      })
    );

    server.use(
      CORS.init(config.getOrigins(), "GET,HEAD,PUT,PATCH,POST,DELETE", true, {
        credentials: true,
        allowedHeaders: config.getAllowedHeaders(),
      })
    );

    server.use(express.json({ limit: config.getJSONLimit() }));

    server.use(
      express.urlencoded({ extended: true, limit: config.getJSONLimit() })
    );

    server.use("/api", new ExpressRouter().registerRoutes());

    server.use("/ping", (req, res, next) => {
      new Responder().respond("pong", null, 200, true, null, res);
    });

    server.use("*", (req, res, next) => {
      new Responder().respond(
        `${req.method} ${req.baseUrl} does not exist`,
        null,
        404,
        false,
        null,
        res
      );
    });
    server.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorMiddleware({ responder: res, err });
      }
    );

    if (config.getNodeEnv() !== "test") {
      server.listen(config.getPort(), () => {
        InfoLogger.write(`server running on PORT ${config.getPort()}`);
      });
    }

    return server;
  }
}
