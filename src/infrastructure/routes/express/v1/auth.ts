import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../../../../application/controllers/auth";
import { AuthMiddleware } from "../../../../application/middleware/auth";

const router = Router();

router.post(
  "/admin/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.createAdmin({ body: req.body, responder: res });
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/user/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.createUser({ body: req.body, responder: res });
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/admin/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.loginAdmin({ body: req.body, responder: res });
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
