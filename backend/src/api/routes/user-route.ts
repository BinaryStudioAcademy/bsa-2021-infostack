import { Router } from 'express';
import { upload } from '../../common/helpers/multer.helper';
import { run } from '../../common/helpers/route.helper';
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

const router: Router = Router();

router
  .get(
    '/me/profile',
    run((req) => getUserById(req.userId)),
  )
  .get(
    '/:id/profile',
    run((req) => getUserByIdWithWorkspace(req.params.id, req.workspaceId)),
  )
  .get(
    '/check-user-registration',
    run((req) => getInviteUserById(req.query.token)),
  )

  .put(
    '/:id/profile',
    run((req) => updateUserInfo(req.params.id, req.body)),
  )

  .put(
    '/:id/avatar',
    upload().single('image'),
    run((req) => updateAvatar(req.params.id, req.file)),
  )
  .delete(
    '/:id/avatar',
    run((req) => deleteAvatar(req.userId)),
  )
  .get(
    '/activities',
    run((req) => getActivities({ skip: req.query.skip, take: req.query.take })),
  )
  .get(
    '/:id/activities',
    run((req) =>
      getUserActivities({
        skip: req.query.skip,
        take: req.query.take,
        userId: req.userId,
      }),
    ),
  );

export default router;
