import { Response, NextFunction } from 'express';

import { HttpCode } from '../../common/enums';
import { IRequestWithUser } from '../../common/interfaces';

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
