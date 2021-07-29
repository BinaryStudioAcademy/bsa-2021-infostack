import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../../../shared/build';

const errorHandlerMiddleware = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  res.status(err.status).send({ error: err.message });
};

export default errorHandlerMiddleware;
