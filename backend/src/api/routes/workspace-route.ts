import { Router } from 'express';

import { run } from '../../common/helpers';
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
import { RoleType } from '../../common/enums';
import {
  validationMiddleware,
  verifyWorkspaceId,
  permit,
} from '../middlewares';
import { workspaceSchema } from '../../common/validations';
import { upload } from '../../common/helpers';

const router: Router = Router();

router.get(
  '/',
  run((req) => getUserWorkspaces(req.userId)),
);

router.get(
  '/:id',
  run((req) => getWorkspace(req.params.id, req.userId)),
);

router.get(
  '/current/users',
  run((req) => getWorkspaceUsers(req.workspaceId)),
);

router.put(
  '/:id',
  permit(RoleType.ADMIN),
  verifyWorkspaceId,
  upload().single('logo'),
  validationMiddleware(workspaceSchema),
  run((req) => updateById(req.workspaceId, req.userId, req.body, req.file)),
);

router.put(
  '/:id/accept-invite-status',
  run((req) => updateInviteStatusAccepted(req.userId, req.params.id)),
);

router.put(
  '/:id/decline-invite-status',
  run((req) => updateInviteStatusDeclined(req.userId, req.params.id)),
);

router.put(
  '/current/update-user-role',
  run((req) =>
    updateRoleByUserIdAndWorkspaceId(
      req.body.userId,
      req.workspaceId,
      req.body.role,
    ),
  ),
);

router.delete(
  '/users/:id',
  permit(RoleType.ADMIN),
  run((req) => deleteUserFromWorkspace(req.params.id, req.workspaceId, req.io)),
);

router.delete(
  '/:id/logo',
  permit(RoleType.ADMIN),
  verifyWorkspaceId,
  run((req) => deleteLogoById(req.workspaceId)),
);

router.post(
  '/invite',
  run((req) => inviteToWorkspace(req.body, req.workspaceId)),
);

router.post(
  '/',
  run((req) => create(req.userId, req.body)),
);

export default router;
