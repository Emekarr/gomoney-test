import RedisRepository from "./cache/RedisRepository";
import MongodbRepository from "./datastore/MongodbDataStore";

export const CacheRepository = Object.freeze(new RedisRepository());

export const DataStoreRepository = MongodbRepository;
