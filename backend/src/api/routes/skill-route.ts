import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getAllByWorkspaceId,
  create,
  deleteById,
  updateNameById,
} from '../../services/skill.service';
import { permit } from '../middlewares/permissions-middleware';
import { RoleType } from '../../common/enums/role-type';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getAllByWorkspaceId(req.workspaceId)),
  )
  .post(
    '/',
    run((req) => create(req.workspaceId, req.body.name)),
  )
  .delete(
    '/:id',
    permit(RoleType.ADMIN),
    run((req) => deleteById(req.params.id)),
  )
  .put(
    '/:id',
    permit(RoleType.ADMIN),
    run((req) => updateNameById(req.workspaceId, req.params.id, req.body.name)),
  );

export default router;
