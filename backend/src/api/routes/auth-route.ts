import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { signUpSchema } from '../../common/validations';
import {
  login,
  register,
  resetPassword,
  setPassword,
  refreshTokens,
  logout,
  updatePasswordAndFullName,
} from '../../services/auth.service';
import { validationMiddleware } from '../middlewares';

const router: Router = Router();

router.post(
  '/register',
  validationMiddleware(signUpSchema),
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
router.post(
  '/update-password-and-fullname',
  run((req) => updatePasswordAndFullName(req.body)),
);

router.post(
  '/refresh',
  run((req) => refreshTokens(req.body)),
);

router.post(
  '/logout',
  run((req) => logout(req.body)),
);

export default router;
