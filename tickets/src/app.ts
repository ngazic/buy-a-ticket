import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { currentUserMiddleware, errorHandlerMiddleware, NotFoundError } from '@ngazicticketingapp/common';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { newTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();

app.set('trust proxy', true); // trust proxy

app.use(json());

app.use(cookieSession({
  name: 'session',
  signed: false,
  // set cookies in http requests too
  secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserMiddleware)

app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.use('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);


export { app };