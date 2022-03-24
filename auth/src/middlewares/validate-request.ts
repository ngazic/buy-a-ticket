import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }

  next();
};