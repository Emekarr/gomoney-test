import ServerInterface from "./ServerInterface";
import express from "express";
import RateLimiter from "./ratelimiter/RateLimiter";
import CORS from "./cors/CORS";
import Responder from "./responder";
import config from "../config";

export default class ExpressServer implements ServerInterface {
  start(): void {
    const server = express();

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

    server.listen(config.getPort(), () => {
      console.log("server running on port " + config.getPort());
    });
  }
}
