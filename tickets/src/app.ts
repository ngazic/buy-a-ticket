import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { errorHandlerMiddleware , NotFoundError} from '@ngazicticketingapp/common';
import 'express-async-errors';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true); // trust proxy

app.use(json());

app.use(cookieSession({
  name: 'session',
  signed: false,
  // set cookies in http requests too
  secure: process.env.NODE_ENV !== 'test'
}));


app.use('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);


export { app };