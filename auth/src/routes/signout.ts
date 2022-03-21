import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/singout', (req: Request, res: Response) => {
  res.send('Signout route');
});

export { router as signoutRouter };
