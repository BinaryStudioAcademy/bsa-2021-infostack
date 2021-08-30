import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getAllByWorkspaceId,
  getAllByUserIdAndWorkspaceId,
  getTeam,
  create,
  updateNameById,
  remove,
  addUser,
  updateTeamRole,
  deleteUser,
} from '../../services/team.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getAllByWorkspaceId(req.workspaceId)),
  )

  .get(
    '/:id',
    run((req) => getTeam(req.params.id, req.workspaceId)),
  )

  .get(
    '/users/:id',
    run((req) => getAllByUserIdAndWorkspaceId(req.params.id, req.workspaceId)),
  )

  .post(
    '/',
    run((req) => create(req.userId, req.workspaceId, { name: req.body.name })),
  )

  .put(
    '/:id',
    run((req) => updateNameById(req.params.id, req.body.name, req.workspaceId)),
  )

  .put(
    '/:id/owner/:owner',
    run((req) =>
      updateTeamRole(req.params.id, req.params.owner, req.workspaceId),
    ),
  )

  .delete(
    '/:id',
    run((req) => remove(req.params.id, req.workspaceId, req.io)),
  )

  .post(
    '/:id/users/:id',
    run((req) =>
      addUser(req.params.id, req.body.userId, req.workspaceId, req.io),
    ),
  )

  .put(
    '/:id/users/:id',
    run((req) =>
      deleteUser(req.params.id, req.body.userId, req.workspaceId, req.io),
    ),
  );

export default router;
