import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 5 }).withMessage('Password must have at least 5 chars')
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
    }

    let { email, password } = req.body;
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return next(new BadRequestError('Email in use'));
    }

    const user = User.build({ email, password });
     user.save();

    res.status(201).send(user);
  }
);


export { router as signupRouter };
