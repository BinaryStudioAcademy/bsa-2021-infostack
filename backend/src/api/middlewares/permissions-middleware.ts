import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '~/common/models/user/request-with-user.interface';
import { PermissionType } from '../../common/enums/permission-type';
import { HttpCode } from 'infostack-shared/common/enums';

export const permit = (...permittedRoles: PermissionType[]) => {
  return (req: IRequestWithUser, res: Response, next: NextFunction): void => {
    const { userId, role } = req;

    if (userId && permittedRoles.includes(role)) {
      next();
    } else {
      res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
    }
  };
};
