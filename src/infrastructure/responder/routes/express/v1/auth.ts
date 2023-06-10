import { Request, Response, Router } from "express";
import AuthController from "../../../../../application/controllers/auth";

const router = Router();

router.post("/admin/create", async (req: Request, res: Response) => {
  await AuthController.createAdmin({ body: req.body, responder: res });
});

export default router;
