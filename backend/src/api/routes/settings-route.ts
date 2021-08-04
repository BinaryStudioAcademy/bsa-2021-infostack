import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getWorkspaceTeams, createTeam } from '../../services/workspace.service';

const router: Router = Router();

router
  .get(
    '/teams',
    run((req) => getWorkspaceTeams(req.workspaceId)),
  )

  .post(
    '/teams',
    run((req) => createTeam(req.workspaceId, req.body)),
  );

export default router;
