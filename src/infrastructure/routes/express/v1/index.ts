import { Router } from "express";
import authRoutes from "./auth";
import teamRoutes from "./team";
import fixtureRoutes from "./fixture";

const router = Router();

router.use("/auth", authRoutes);

router.use("/team", teamRoutes);

router.use("/fixture", fixtureRoutes);

export default router;
