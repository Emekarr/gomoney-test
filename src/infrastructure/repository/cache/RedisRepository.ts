import CacheInterface from "../interfaces/CacheInterface";
import { RedisClientType } from "@redis/client";
import { Options } from "./type";

export default class RedisRepository implements CacheInterface {
  constructor(private redis: RedisClientType) {}

  async createEntry(
    key: string,
    payload: any,
    opts?: Partial<Options>
  ): Promise<boolean> {
    const success =
      (await this.redis.SET(key, JSON.stringify(payload))) == "OK";
    if (opts) {
      opts.expireIn ? this.redis.EXPIRE(key, opts.expireIn) : null;
    }
    return success;
  }

  async createSet(key: string, payload: any): Promise<boolean> {
    return (
      (await this.redis.ZADD(key, {
        score: Date.now(),
        value: JSON.stringify(payload),
      })) !== 0
    );
  }

  async findSet(key: string): Promise<any> {
    return await this.redis.ZRANGE(key, 0, -1);
  }

  async findEntry(key: string): Promise<any> {
    return await this.redis.GET(key);
  }

  async updateOne(key: string, payload: any): Promise<any> {
    return await this.redis.SET(key, JSON.stringify(payload));
  }

  async updateSet(
    key: string,
    payload: any,
    opts?: Partial<Options>
  ): Promise<any> {
    if (opts) {
      opts.maxLength
        ? (async () => {
            const setSize = await this.redis.ZCARD(key);
            if (setSize >= opts.maxLength!) {
              await this.redis.ZREMRANGEBYSCORE(
                key,
                -Infinity,
                setSize - opts.maxLength!
              );
            }
          })()
        : null;
    }
    return (
      (await this.redis.ZADD(key, {
        score: Date.now(),
        value: JSON.stringify(payload),
      })) !== 0
    );
  }

  async deleteOne(key: string): Promise<boolean> {
    return (await this.redis.DEL(key)) !== 0;
  }

  async deleteFromSet(key: string, payload: any[]): Promise<boolean> {
    return (await this.redis.ZREM(key, payload)) !== 0;
  }

  async __truncate(): Promise<void> {
    await this.redis.FLUSHDB();
  }
}
