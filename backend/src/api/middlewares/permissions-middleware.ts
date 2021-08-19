import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpCode } from '../../common/enums/http-code';
import UserWorkspaceRepository from '../../data/repositories/user-workspace.repository';
import { RoleType } from '../../common/enums/role-type';
import { IRequestWithUser } from '../../common/interfaces/http';

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
    const userWorkspace =
      await userWorkspaceRepository.findByUserIdAndWorkspaceId(
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
