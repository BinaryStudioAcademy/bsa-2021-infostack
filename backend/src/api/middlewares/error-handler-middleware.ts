import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../../common/enums/http-code';
import { HttpError } from '../../common/errors/http-error';

const errorHandlerMiddleware = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  if (err instanceof HttpError) {
    res.status(err.status).send({ error: err.message });
  } else {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send({ error: 'Internal Server Error' });
  }
};

export default errorHandlerMiddleware;
