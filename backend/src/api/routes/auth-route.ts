import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { register } from '../../services/auth.service';

const router: Router = Router();

router.post(
  '/register',
  run((req) => register(req.body)),
);

export default router;
