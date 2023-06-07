import ServerInterface from "./ServerInterface";
import express from "express";
import RateLimiter from "./ratelimiter/RateLimiter";
import CORS from "./cors/CORS";
import Responder from "./responder";

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
      CORS.init(
        process.env.ORIGINS as string,
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        true,
        { credentials: true, allowedHeaders: process.env.ALLOWED_HEADERS }
      )
    );

    server.use(express.json({ limit: process.env.JSON_LIMIT }));

    server.use(
      express.urlencoded({ extended: true, limit: process.env.JSON_LIMIT })
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

    server.listen(process.env.PORT || 3000, () => {
      console.log("server running on port " + process.env.PORT ?? 3000);
    });
  }
}
