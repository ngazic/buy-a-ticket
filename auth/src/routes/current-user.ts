import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/current-user', (req: Request, res: Response) => {
  res.send('Current user route');
});

export { router as currentUserRouter };
