import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAccessToken } from '../../services/github.service';
const router: Router = Router();

router.get(
  '/accessToken',
  run((req) => getAccessToken(req.query.code.toString())),
);

export default router;
