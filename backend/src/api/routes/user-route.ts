import { Router } from 'express';
import { Multer } from '../../common/helpers/multer.helper';
import { run } from '../../common/helpers/route.helper';
import {
  getUserById,
  updateFullName,
  updateAvatar,
} from '../../services/user.service';

const router: Router = Router();
const multerHelper = new Multer();

router.get(
  '/:id/profile',
  run((req) => getUserById(req.params.id)),
);

router.put(
  '/:id/profile',
  run((req) => updateFullName(req.params.id, req.body)),
);

router.put(
  '/:id/avatar',
  multerHelper.upload().single('image'),
  run((req) => updateAvatar(req.params.id, req.file)),
);

export default router;
