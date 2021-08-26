import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createAccessToken,
  getUsername,
  getRepos,
  addCurrentRepo,
  getCurrentRepo,
  prWebhookHandler,
  labelWebhookHandler,
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

router.post(
  '/webhooks/pr',
  run((req) => prWebhookHandler(req.io, req.body.pull_request)),
);

router.post(
  '/webhooks/label',
  run((req) => labelWebhookHandler(req.body)),
);

export default router;
