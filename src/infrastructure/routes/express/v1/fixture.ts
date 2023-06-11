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
      req.user = user;
      next();
    } catch (err: any) {
      next(err);
    }
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await FixtureController.fetchFixture({
        responder: res,
        query: {
          lastID: req.query.lastID as string,
          limit: Number(req.query.limit) ?? 15,
          all: "true" === (req.query.all as string),
          adminID: req.user.id,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await FixtureController.searchFixtures({
        responder: res,
        query: {
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
      await FixtureController.deleteFixturesUseCase({
        responder: res,
        adminID: req.user.id,
        id: req.query.id as string,
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
      await FixtureController.updateFixtures({
        responder: res,
        body: req.body,
        query: { id: req.query.id as string, adminID: req.user.id },
      });
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
