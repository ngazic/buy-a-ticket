import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 5 }).withMessage('Password must have at least 5 chars')
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {


    let { email, password } = req.body;
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return next(new BadRequestError('Email in use'));
    }

    const user = User.build({ email, password });
    user.save();

    // Generate JWT token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);


export { router as signupRouter };
