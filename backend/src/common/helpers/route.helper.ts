/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary, Params } from 'express-serve-static-core';
import { Server } from 'socket.io';

interface IExtendedRequest<P, ResBody, ReqBody, ReqQuery>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId?: string;
  workspaceId?: string;
  io?: Server;
  file?: Express.Multer.File;
}

export const run =
  <
    P extends Params = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
  >(
    method: (
      req?: IExtendedRequest<P, ResBody, ReqBody, ReqQuery>,
    ) => Promise<ResBody>,
  ) =>
  (
    req: IExtendedRequest<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction,
  ): void => {
    method(req)
      .then((result) => (result ? res.send(result) : res.sendStatus(204)))
      .catch(next);
  };
