import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createPage,
  getPages,
  getPage,
  getContributors,
  updateContent,
} from '../../services/page.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => createPage(req.userId, req.workspaceId, req.body)),
);

router.get(
  '/',
  run((req) => getPages(req.userId, req.workspaceId)),
);

router.get(
  '/:id/contributors',
  run((req) => getContributors(req.params.id)),
);

router.get(
  '/:id',
  run((req) => getPage(req.params.id)),
);

router.post(
  '/:id/version',
  run((req) => updateContent(req.body)),
);

export default router;
