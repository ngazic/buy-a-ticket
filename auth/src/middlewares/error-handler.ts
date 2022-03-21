import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors()});
  }

  res.status(404).send({ message: 'Something went wrong!!' })
};

