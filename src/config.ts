import dotenv from "dotenv";
dotenv.config();

const getPort = (): string => {
  return (process.env.PORT as string) ?? "3000";
};

const getJSONLimit = (): string => {
  return process.env.JSON_LIMIT as string;
};

const getAllowedHeaders = (): string[] => {
  return (process.env.ALLOWED_HEADERS as string).split(",");
};

const getOrigins = (): string[] => {
  return (process.env.ORIGINS as string).split(",");
};

const getLogAggregator = (): string => {
  return process.env.LOG_AGGREGATOR_URL as string;
};

const getMongoURL = (): string => {
  return process.env.MONGO_URL as string;
};

const getDatabaseName = (): string => {
  return process.env.DB_NAME as string;
};

const getRedisURL = (): string => {
  return process.env.REDIS_URL as string;
};

const getJWTSecret = (): string => {
  return process.env.JWT_SECRET as string;
};

const getRefreshTokenLife = (): number => {
  return parseInt(process.env.REFRESH_TOKEN_LIFE as string, 10);
};

const getAccessTokenLife = (): number => {
  return parseInt(process.env.ACCESS_TOKEN_LIFE as string, 10);
};

const getJWTIssuer = (): string => {
  return process.env.JWT_ISSUER as string;
};

export default {
  getAllowedHeaders,
  getJSONLimit,
  getOrigins,
  getPort,
  getLogAggregator,
  getMongoURL,
  getRedisURL,
  getDatabaseName,
  getJWTSecret,
  getRefreshTokenLife,
  getAccessTokenLife,
  getJWTIssuer,
};
