import { Request, Response, NextFunction } from 'express';
import { HttpCode } from 'infostack-shared/common/enums';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const decoded = jwt.verify(req.headers['x-auth-token'], process.env.SECRET_KEY);
    req.userId = decoded;
    next();
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Something wrong', error: err });
  }
};

export const checkWorkSpace = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { workspaceId } = req.cookies;
  // TODO: replace real data
  if(workspaceId === 'first') {
    next();
  } else {
    res.status(HttpCode.NOT_FOUND).json({ msg: 'Workspace is not found' });
  }
};
