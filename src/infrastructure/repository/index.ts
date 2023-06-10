import MongodbDataStore from "./datastore/MongodbDataStore";
import RedisRepository from "./cache/RedisRepository";
import CacheConnetion from "../database/connection/cache";

export const DataStoreRepository = MongodbDataStore;
export const CacheRepository = new RedisRepository(CacheConnetion.redis);
CacheConnetion.redis
