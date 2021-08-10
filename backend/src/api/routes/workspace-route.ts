import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getWorkspaceUsers,
  getUserWorkspaces,
  getWorkspace,
  create,
} from '../../services/workspace.service';
import { permit } from '../middlewares/permissions-middleware';
import { RoleType } from '../../common/enums/role-type';

const router: Router = Router();

router
  .get('/', run(req => getUserWorkspaces(req.userId)))
  .get(
    '/:id',
    run(req => getWorkspace(req.params.id, req.userId)))
  .get(
    '/current/users',
    permit(RoleType.ADMIN),
    run((req) => getWorkspaceUsers(req.workspaceId)),
  )
  .post('/', run((req) => create(req.userId, req.body)));

export default router;
