import { Router } from 'express';
import { upload } from '../../common/helpers/multer.helper';
import { run } from '../../common/helpers/route.helper';
import {
  getUserById,
  updateUserInfo,
  updateAvatar,
} from '../../services/user.service';

const router: Router = Router();

router.get(
  '/me/profile',
  run((req) => getUserById(req.userId)),
);

router.get(
  '/:id/profile',
  run((req) => getUserById(req.params.id)),
);

router.put(
  '/:id/profile',
  run((req) => updateUserInfo(req.params.id, req.body)),
);

router.put(
  '/:id/avatar',
  upload().single('image'),
  run((req) => updateAvatar(req.params.id, req.file)),
);

export default router;
