import { Response, NextFunction } from 'express';
import { HttpCode } from 'infostack-shared/common/enums';
import { IRequestWithUser } from '../../common/models/user/request-with-user.interface';

export const verifyWorkspaceId = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): void => {
  if (req.workspaceId !== req.params.id) {
    res.status(HttpCode.BAD_REQUEST).send();
  } else {
    next();
  }
};
