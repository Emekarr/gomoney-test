import Loki from "winston-loki";
import winston from "winston";
import config from "../../../config";

export default new Loki({
  host: config.getLogAggregator(),
  json: true,
  format: winston.format.json(),
});
