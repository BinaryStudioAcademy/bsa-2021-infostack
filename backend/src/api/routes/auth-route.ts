import { Router } from 'express';
import { jwtLogin } from '../../services/user.service';
import { run } from '../../common/helpers/route.helper';
import { login, register } from '../../services/auth.service';

const router: Router = Router();

router
  .post('/', jwtLogin);

router.post(
  '/register',
  run((req) => register(req.body)),
);

router.post(
  '/login',
  run((req) => login(req.body)),
);

export default router;
