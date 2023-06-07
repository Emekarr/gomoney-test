import ExpressServer from "./ExpressServer";
import ServerInterface from "./ServerInterface";

export const startServer = (server: ServerInterface) => {
  server.start();
};

export default () => {
  startServer(new ExpressServer());
};
