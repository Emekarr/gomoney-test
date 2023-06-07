import ServerInterface from "./ServerInterface";
import express from "express";
import RateLimiter from "./ratelimiter/RateLimiter";
import CORS from "./cors/CORS";

export default class ExpressServer implements ServerInterface {
  start(): void {
    const server = express();

    // rate limiter
    server.use(
      RateLimiter.init(10 * 60 * 1000, 30, {
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
          res.status(429).send({
            message: "slow down! you have been rate limited",
          });
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
      res.status(200).send({
        message: `pong`,
      });
    });

    server.use("*", (req, res, next) => {
      res.status(404).send({
        message: `${req.method} ${req.baseUrl} does not exist`,
      });
    });

    server.listen(process.env.PORT || 3000, () => {
      console.log("server running on port " + process.env.PORT ?? 3000);
    });
  }
}
