import ExpressServer from "./ExpressServer";
import ServerInterface from "./ServerInterface";
import DBConnection from "./database/connection";

export const startServer = (server: ServerInterface) => {
  server.start();
};

export const startServices = () => {
  // database
  DBConnection();
};

export default () => {
  startServices();
  startServer(new ExpressServer());
};
