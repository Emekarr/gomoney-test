import { createClient, RedisClientType } from "@redis/client";
import ErrorLogger from "../../../logger/ErrorLogger";
import config from "../../../../config";
import InfoLogger from "../../../logger/InfoLogger";

class RedisConnection {
  readonly redis: RedisClientType;

  constructor() {
    this.redis = createClient({ url: config.getRedisURL() });
    this.redis.on("error", (err) =>
      ErrorLogger.write("redis client error", { err })
    );
    this.redis.connect();
    InfoLogger.write("redis connection successful");
  }
}

export default Object.freeze(new RedisConnection());
