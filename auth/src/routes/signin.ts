import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-valdation-error';


const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 5 }).withMessage('Password must have at least 5 chars')
  ],
  (req: Request, res: Response) => {
    console.log('sing in router');
    let { email, password } = req.body;
    console.log(email, password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    res.status(200).send('You are signed in ');
  }
);

export { router as signinRouter };
