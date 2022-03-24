import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
const port = 3000;

app.set('trust proxy', true); // trust proxy

app.use(json());

app.use(cookieSession({
  name: 'session',
  signed: false,
  // set cookies in http requests too
  secure: true
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY environment variable is not defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!!`);
  });
};


start();