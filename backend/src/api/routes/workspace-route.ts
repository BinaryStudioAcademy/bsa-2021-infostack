import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getUsers } from '../../services/workspace.service';

const router: Router = Router();

// TODO: add security middleware's
router.get(
  '/users',
  // TODO: change with req.cookies.workspaceId
  run(() => getUsers('b6e959fd-09b3-42cd-8a30-90c31054198a')),
);

export default router;
