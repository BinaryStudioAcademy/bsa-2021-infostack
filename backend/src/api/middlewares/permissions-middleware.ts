import { Response, NextFunction } from 'express';
import { HttpCode } from 'infostack-shared/common/enums';
import { getCustomRepository } from 'typeorm';
import UserWorkspaceRepository from '../../data/repositories/user-workspace.repository';
import { RoleType } from '~/common/enums/role-type';
import { IRequestWithUser } from '~/common/models/user/request-with-user.interface';

export const permit = (...permittedRoles: RoleType[]) => {
  return async (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { userId, workspaceId } = req;

    const userWorkspaceRepository = getCustomRepository(
      UserWorkspaceRepository,
    );
    const userWorkspace = await userWorkspaceRepository.findById(
      userId,
      workspaceId,
    );

    if (userId && permittedRoles.includes(userWorkspace?.role)) {
      next();
    } else {
      res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
    }
  };
};
