import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const decoded = jwt.verify(req.headers['x-auth-token'], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Something wrong', error: err });
  }
};

export const checkWorkSpace = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { workspaceId } = req.user;
  // TODO: replace real data
  if(workspaceId === 'first') {
    next();
  } else {
    res.status(404).json({ msg: 'Workspace is not found' });
  }
};
