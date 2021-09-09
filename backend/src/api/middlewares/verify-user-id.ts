import { Response, NextFunction } from 'express';

import { HttpCode } from '../../common/enums';
import { IRequestWithUser } from '../../common/interfaces';

export const verifyUserId = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): void => {
  if (req.userId !== req.params.userId) {
    res.status(HttpCode.BAD_REQUEST).send();
  } else {
    next();
  }
};
