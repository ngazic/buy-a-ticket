import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';

const app = express();
const port = 3000;

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!`);
});
