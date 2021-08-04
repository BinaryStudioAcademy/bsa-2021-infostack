import { Router } from 'express';
import { upload } from '../../common/helpers/multer.helper';
import { run } from '../../common/helpers/route.helper';
import {
  getUserById,
  updateFullName,
  updateAvatar,
  getUserByIdWithWorkspace,
} from '../../services/user.service';

const router: Router = Router();

router.get(
  '/me/profile',
  run((req) => getUserById(req.userId)),
);

router.get(
  '/:id/profile',
  run((req) => getUserByIdWithWorkspace(req.params.id, req.workspaceId)),
);

router.put(
  '/:id/profile',
  run((req) => updateFullName(req.params.id, req.body)),
);

router.put(
  '/:id/avatar',
  upload().single('image'),
  run((req) => updateAvatar(req.params.id, req.file)),
);

export default router;
