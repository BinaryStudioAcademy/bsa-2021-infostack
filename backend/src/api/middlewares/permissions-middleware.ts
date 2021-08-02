import { Response, NextFunction } from 'express';
import { HttpCode } from 'infostack-shared/common/enums';
import { getCustomRepository } from 'typeorm';
import UserWorkspaceRepository from '../../data/repositories/user-workspace-repository';
import { UserRole } from '~/data/entities/enums/user-role';
import { IRequestWithUser } from '~/common/models/user/request-with-user.interface';

export const permit = (...permittedRoles: UserRole[]) => {
  return async (req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    const { userId, workspaceId } = req;

    const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
    const { role } = await userWorkspaceRepository.findById(userId, workspaceId);

    if (userId && permittedRoles.includes(role)) {
      next();
    } else {
      res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
    }
  };
};
