import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  login,
  register,
  resetPassword,
  setPassword,
} from '../../services/auth.service';

const router: Router = Router();

router.post(
  '/register',
  run((req) => register(req.body)),
);

router.post(
  '/login',
  run((req) => login(req.body)),
);

router.post(
  '/reset-password',
  run((req) => resetPassword(req.body)),
);

router.post(
  '/set-password',
  run((req) => setPassword(req.body)),
);

export default router;
