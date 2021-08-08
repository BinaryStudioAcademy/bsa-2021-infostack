import { Response, NextFunction } from 'express';
import { HttpCode, HttpErrorMessage } from 'infostack-shared/common/enums';
// import jwt from 'jsonwebtoken';
import whiteListRoutes from '../../config/white-list-routes-config';
import { IRequestWithUser } from '../../common/models/user/request-with-user.interface';
// import { env } from '../../env';

export const auth = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): void => {
  if (whiteListRoutes.includes(req.path)) {
    return next();
  }

  try {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, env.app.secretKey) as { userId: string };
    // const { workspaceId } = req.cookies;

    // req.workspaceId = workspaceId;
    // req.userId = decoded.userId;
    req.workspaceId = 'b6c859ee-aa0d-4e65-a6b8-70799cd1fcd1';
    req.userId = '5b25e1d4-e869-4e63-bab1-7b5b06859367';

    next();
  } catch (err) {
    res.status(HttpCode.UNAUTHORIZED).json({ msg: HttpErrorMessage.UNAUTHORIZED, error: err });
  }
};
