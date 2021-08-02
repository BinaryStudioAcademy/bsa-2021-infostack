import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '~/common/models/user/request-with-user.interface';
import { HttpCode } from 'infostack-shared/common/enums';
import jwt from 'jsonwebtoken';

export const auth = (req: IRequestWithUser, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as string;
    req.userId = decoded;
    next();
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Something wrong', error: err });
  }
};
