import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createPage,
  getPages,
  getPage,
  getPermissions,
  setPermission,
  deletePermission,
} from '../../services/page.service';

const router: Router = Router();

router.post(
  '/',
  run(req => createPage(req.userId, req.workspaceId, req.body)),
);

router.get(
  '/',
  run(req => getPages(req.userId, req.workspaceId)),
);

router.get(
  '/:id',
  run(req => getPage(req.params.id)),
);

router.get(
  '/:id/permissions',
  run(req => getPermissions(req.params.id)),
);

router.post(
  '/:id/permissions',
  run(req => setPermission(req.params.id, req.body)),
);

router.delete(
  '/:id/permissions/:participantType/:participiantId',
  run(req => deletePermission(req.params.id, req.params.participantType, req.params.participiantId)),
);

export default router;
