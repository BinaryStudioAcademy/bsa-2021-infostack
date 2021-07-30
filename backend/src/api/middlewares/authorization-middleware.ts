import { Request, Response, NextFunction } from 'express';
import { IRequestWithUser } from '~/common/models/user/IRequestWithUser';
import { HttpCode } from 'infostack-shared/common/enums';
import jwt from 'jsonwebtoken';

export const auth = (req: IRequestWithUser, res: Response, next: NextFunction): void => {
  try {
    const decoded = jwt.verify(req.headers['x-auth-token'] as string, process.env.SECRET_KEY) as string;
    req.userId = decoded;
    next();
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Something wrong', error: err });
  }
};

export const checkWorkSpace = (req: Request, res: Response, next: NextFunction): void => {
  const { workspaceId } = req.cookies;
  if(workspaceId) {
    next();
  } else {
    res.status(HttpCode.NOT_FOUND).json({ msg: 'Workspace is not found' });
    throw new Error('Workspace is not found');
  }
};

export const permissions = (...permittedRoles: string[]) => {
  return (req: IRequestWithUser, res: Response, next: NextFunction): void => {
    const { userId, role } = req;

    if (userId && permittedRoles.includes(role)) {
      next();
    } else {
      res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
    }
  };
};
