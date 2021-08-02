import { Response, NextFunction } from 'express';
import { IRequestWithWorkspace } from '~/common/models/workspace/request-with-workspace.interface';
import { HttpCode } from 'infostack-shared/common/enums';

export const checkWorkspace = (req: IRequestWithWorkspace, res: Response, next: NextFunction): void => {
  const { workspaceId } = req.cookies;
  if(workspaceId) {
    req.workspaceId = workspaceId;
    next();
  } else {
    res.status(HttpCode.NOT_FOUND).json({ msg: 'Workspace is not found' });
    throw new Error('Workspace is not found');
  }
};
