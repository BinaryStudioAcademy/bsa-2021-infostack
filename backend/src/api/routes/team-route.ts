import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAllByWorkspaceId, getTeam, create, updateNameById, deleteById } from '../../services/team.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getAllByWorkspaceId(req.workspaceId)),
  )

  .get(
    '/:id',
    run((req => getTeam(req.params.id))),
  )

  .post(
    '/',
    run((req) => create(req.userId, { name: req.body.name })),
  )

  .put(
    '/:id',
    run((req) =>  updateNameById(req.params.id, req.body.name)),
  )

  .delete(
    '/:id',
    run((req) => deleteById(req.params.id)),
  );

export default router;
