import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAllByWorkspaceId, create } from '../../services/skill.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => getAllByWorkspaceId(req.workspaceId)),
);

router.post(
  '/',
  run((req) => create(req.workspaceId, req.body.name)),
);

export default router;
