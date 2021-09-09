import { Router } from 'express';

import { run } from '../../common/helpers';
import { getRecentPages } from '../../services/page.service';
import {
  getUserById,
  updateUserInfo,
  updateAvatar,
  getUserByIdWithWorkspace,
  deleteAvatar,
  getInviteUserById,
  getActivities,
  getUserActivities,
} from '../../services/user.service';
import { upload } from '../../common/helpers';

const router: Router = Router();

router.get(
  '/me/profile',
  run((req) => getUserById(req.userId, req.workspaceId)),
);

router.get(
  '/:id/profile',
  run((req) => getUserByIdWithWorkspace(req.params.id, req.workspaceId)),
);

router.get(
  '/check-user-registration',
  run((req) => getInviteUserById(req.query.token)),
);

router.put(
  '/:id/profile',
  run((req) => updateUserInfo(req.params.id, req.workspaceId, req.body)),
);

router.put(
  '/:id/avatar',
  upload().single('image'),
  run((req) => updateAvatar(req.params.id, req.file)),
);

router.delete(
  '/:id/avatar',
  run((req) => deleteAvatar(req.userId)),
);

router.get(
  '/activities',
  run((req) =>
    getActivities(req.userId, req.workspaceId, {
      skip: req.query.skip,
      take: req.query.take,
    }),
  ),
);

router.get(
  '/:id/activities',
  run((req) =>
    getUserActivities(req.workspaceId, {
      skip: req.query.skip,
      take: req.query.take,
      userId: req.userId,
    }),
  ),
);

router.get(
  '/:id/recent-pages',
  run((req) => getRecentPages(req.userId, req.workspaceId)),
);

export default router;
