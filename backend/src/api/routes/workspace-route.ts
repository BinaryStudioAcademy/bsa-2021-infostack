import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getUserWorkspaces,
  getWorkspaceUsers,
  getWorkspace,
  create,
  inviteToWorkspace,
  updateInviteStatusAccepted,
  updateInviteStatusDeclined,
  deleteUserFromWorkspace,
} from '../../services/workspace.service';
import { permit } from '../middlewares/permissions-middleware';
import { RoleType } from '../../common/enums/role-type';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getUserWorkspaces(req.userId)),
  )
  .get(
    '/:id',
    run((req) => getWorkspace(req.params.id, req.userId)),
  )
  .get(
    '/current/users',
    permit(RoleType.ADMIN),
    run((req) => getWorkspaceUsers(req.workspaceId)),
  )
  .put(
    '/:id/accept-invite-status',
    run((req) => updateInviteStatusAccepted(req.userId, req.params.id)),
  )
  .put(
    '/:id/decline-invite-status',
    run((req) => updateInviteStatusDeclined(req.userId, req.params.id)),
  )
  .delete(
    '/users/:id',
    permit(RoleType.ADMIN),
    run((req) =>
      deleteUserFromWorkspace(req.params.id, req.workspaceId, req.io),
    ),
  )
  .post(
    '/invite',
    run((req) => inviteToWorkspace(req.body, req.workspaceId)),
  )
  .post(
    '/',
    run((req) => create(req.userId, req.body)),
  );

export default router;
