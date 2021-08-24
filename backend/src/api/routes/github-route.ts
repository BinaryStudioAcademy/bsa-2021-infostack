import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createAccessToken,
  getUsername,
  getRepos,
  addCurrentRepo,
  getCurrentRepo,
} from '../../services/github.service';
const router: Router = Router();

router.post(
  '/access-token',
  run((req) => createAccessToken(req.body.code)),
);

router.get(
  '/username',
  run(() => getUsername()),
);

router.get(
  '/repos',
  run(() => getRepos()),
);

router.post(
  '/current-repo',
  run((req) => addCurrentRepo(req.body.repo)),
);

router.get(
  '/current-repo',
  run(() => getCurrentRepo()),
);

export default router;
