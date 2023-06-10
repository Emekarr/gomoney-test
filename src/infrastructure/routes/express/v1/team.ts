import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../../../../application/middleware/auth";
import TeamController from "../../../../application/controllers/team";

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
      await TeamController.createTeam({
        responder: res,
        body: req.body,
        id: req.user.id,
      });
    } catch (err: any) {
      next(err);
    }
  }
);

router.patch(
  "/update",
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
      await TeamController.updateTeam({
        responder: res,
        body: req.body,
        query: { id: req.query.id as string, adminID: req.user.id },
      });
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/delete",
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
      await TeamController.deleteTeamsUseCase({
        responder: res,
        adminID: req.user.id,
        id: req.query.id as string,
      });
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/fetch",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthMiddleware({
        responder: res,
        authToken: req.headers.authorization,
        admin: false,
      });
      if (!user) return;
      next();
    } catch (err: any) {
      next(err);
    }
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TeamController.fetchTeam({
        responder: res,
        query: {
          lastID: req.query.lastID as string,
          limit: Number(req.query.limit) ?? 15,
        },
        body: {
          name: req.body.name,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
