import express, { NextFunction, Request, Response } from 'express';
import { currentUserMiddleware } from '@ngazicticketingapp/common';

const router = express.Router();

router.get(
  '/api/users/current-user',
  currentUserMiddleware,
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send({ currentUser: req.currentUser || null });
  });

export { router as currentUserRouter };
