import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest as validateRequestMiddleware } from "@ngazicticketingapp/common";
import { User } from '../models/user';
import { Password } from '../services/password';



const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim().notEmpty()
      .isLength({ min: 5 })
      .withMessage('Password must have at least 5 chars')
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(new BadRequestError('Invalid credentials'));
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      return next(new BadRequestError('Invalid Credentials'));
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);

  }
);

export { router as signinRouter };
