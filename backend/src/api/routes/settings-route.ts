import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getWorkspaceTeams, createTeam, updateTeam, deleteTeam } from '../../services/workspace.service';

const router: Router = Router();

router
  .get(
    '/teams',
    run((req) => getWorkspaceTeams(req.workspaceId)),
  )

  .post(
    '/teams',
    run((req) => createTeam(req.workspaceId, req.body)),
  )

  .put(
    '/teams/:id',
    run((req) => updateTeam(req.params.id, req.body)),
  )

  .delete(
    '/teams/:id',
    run((req) => deleteTeam(req.params.id)),
  );

export default router;
