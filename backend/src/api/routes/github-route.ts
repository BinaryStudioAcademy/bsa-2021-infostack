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
  run((req) => createAccessToken(req.workspaceId, req.body.code)),
);

router.get(
  '/username',
  run((req) => getUsername(req.workspaceId)),
);

router.get(
  '/repos',
  run((req) => getRepos(req.workspaceId)),
);

router.post(
  '/current-repo',
  run((req) => addCurrentRepo(req.workspaceId, req.body.repo)),
);

router.get(
  '/current-repo',
  run((req) => getCurrentRepo(req.workspaceId)),
);

export default router;
