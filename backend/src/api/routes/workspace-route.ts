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
  updateById,
  deleteLogoById,
  updateRoleByUserIdAndWorkspaceId,
} from '../../services/workspace.service';
import { permit } from '../middlewares/permissions-middleware';
import { RoleType } from '../../common/enums/role-type';
import { validationMiddleware, verifyWorkspaceId } from '../middlewares';
import { workspaceSchema } from '../../common/validations';
import { upload } from '../../common/helpers/multer.helper';

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
    run((req) => getWorkspaceUsers(req.workspaceId)),
  )
  .put(
    '/:id',
    permit(RoleType.ADMIN),
    verifyWorkspaceId,
    upload().single('logo'),
    validationMiddleware(workspaceSchema),
    run((req) => updateById(req.workspaceId, req.userId, req.body, req.file)),
  )
  .put(
    '/:id/accept-invite-status',
    run((req) => updateInviteStatusAccepted(req.userId, req.params.id)),
  )
  .put(
    '/:id/decline-invite-status',
    run((req) => updateInviteStatusDeclined(req.userId, req.params.id)),
  )
  .put(
    '/current/update-user-role',
    run((req) =>
      updateRoleByUserIdAndWorkspaceId(
        req.body.userId,
        req.workspaceId,
        req.body.role,
      ),
    ),
  )
  .delete(
    '/users/:id',
    permit(RoleType.ADMIN),
    run((req) =>
      deleteUserFromWorkspace(req.params.id, req.workspaceId, req.io),
    ),
  )
  .delete(
    '/:id/logo',
    permit(RoleType.ADMIN),
    verifyWorkspaceId,
    run((req) => deleteLogoById(req.workspaceId)),
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
