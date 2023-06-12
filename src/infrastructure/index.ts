import ExpressServer from "./ExpressServer";
import ServerInterface from "./ServerInterface";
import DBConnection from "./database/connection";

export const startServer = (server: ServerInterface) => {
  return server.start();
};

export const startServices = () => {
  // database
  DBConnection();
};

export default () => {
  startServices();
  return startServer(new ExpressServer());
};
