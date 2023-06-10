import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../../../../application/middleware/auth";
import FixtureController from "../../../../application/controllers/fixture";

const router = Router();

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthMiddleware({
        responder: res,
        authToken: req.headers.authorization,
        admin: true,
      });
      if (!user) return;
      req.user = user;
      next();
    } catch (err: any) {
      next(err);
    }
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await FixtureController.createFixture({
        responder: res,
        body: req.body,
        adminID: req.user.id,
      });
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
