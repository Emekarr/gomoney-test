import RoutesInterface from "../RoutesInterface";
import { Router } from "express";
import v1 from "./v1";

export default class ExpressRouter implements RoutesInterface {
  registerRoutes() {
    const router = Router();

    router.use("/v1", v1);
    return router;
  }
}

