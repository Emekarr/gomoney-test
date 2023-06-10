import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../../../../application/controllers/auth";
import { AuthMiddleware } from "../../../../application/middleware/auth";

const router = Router();

router.post("/admin/create", async (req: Request, res: Response) => {
  await AuthController.createAdmin({ body: req.body, responder: res });
});

router.post("/admin/login", async (req: Request, res: Response) => {
  await AuthController.loginAdmin({ body: req.body, responder: res });
});

export default router;
