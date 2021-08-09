import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getUserWorkspaces,
  getWorkspace,
  createWorkspace,
} from '../../services/workspace.service';
import { verifyWorkspaceId } from '../middlewares/verify-workspace-id';

const router: Router = Router();

router
  .get('/', run(req => getUserWorkspaces(req.userId)))
  .get(
    '/:id',
    verifyWorkspaceId,
    run(req => getWorkspace(req.params.id, req.userId)))
  .post('/', run((req) => createWorkspace(req.userId, req.body)));

export default router;
