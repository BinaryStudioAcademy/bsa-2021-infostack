import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { login, register } from '../../services/auth.service';

const router: Router = Router();

router.post(
  '/register',
  run((req) => register(req.body)),
);

router.post(
  '/login',
  run((req) => login(req.body)),
);

export default router;
