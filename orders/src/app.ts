import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { currentUserMiddleware, errorHandlerMiddleware, NotFoundError } from '@ngazicticketingapp/common';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes';


const app = express();

app.set('trust proxy', true); // trust proxy

app.use(json());

app.use(cookieSession({
  name: 'session',
  signed: false,
  // set cookies in http requests too
  secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserMiddleware);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);


app.use('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);


export { app };