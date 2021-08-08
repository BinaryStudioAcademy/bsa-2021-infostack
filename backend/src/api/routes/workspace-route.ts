import { Router } from 'express';
import { RoleType } from 'infostack-shared';
import { run } from '../../common/helpers/route.helper';
import { IRequestWithUser } from '../../common/models/user/request-with-user.interface';
import {
  getUserWorkspaces,
  getWorkspaceUsers,
  getOne,
  create,
  getWorkspaceUserRole,
} from '../../services/workspace.service';
import { permit } from '../middlewares/permissions-middleware';
import { verifyUserId } from '../middlewares/verify-user-id';
import { verifyWorkspaceId } from '../middlewares/verify-workspace-id';

const router: Router = Router();

router
  .get('/', run(req => getUserWorkspaces(req.userId)))
  .get('/:id', run(req => getOne(req.params.id, req.userId)))
  .get(
    '/:id/user/:userId/role',
    verifyWorkspaceId,
    verifyUserId,
    run((req: IRequestWithUser) => getWorkspaceUserRole(req.userId, req.workspaceId)))
  .get(
    '/:id/users',
    verifyWorkspaceId,
    permit(RoleType.ADMIN),
    run((req: IRequestWithUser) => getWorkspaceUsers(req.workspaceId)),
  )
  .post('/', run((req) => create(req.userId, req.body)));

export default router;
