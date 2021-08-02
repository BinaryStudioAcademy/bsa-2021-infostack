import { Response, NextFunction } from 'express';
import { HttpCode } from 'infostack-shared/common/enums';
import jwt from 'jsonwebtoken';
import whiteListRoutes from '../../config/white-list-routes-config';
import { IRequestWithUser } from '~/common/models/user/request-with-user.interface';

export const auth = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): void => {
  if (whiteListRoutes.includes(req.path)) {
    return next();
  }

  const { workspaceId } = req.cookies;

  if (workspaceId) {
    req.workspaceId = workspaceId;
    next();
  } else {
    res.status(HttpCode.NOT_FOUND).json({ msg: 'Workspace is not found' });
    throw new Error('Workspace is not found');
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as string;
    req.userId = decoded;
    next();
  } catch (err) {
    res.status(HttpCode.UNAUTHORIZED).json({ msg: 'Unauthorized', error: err });
  }
};
