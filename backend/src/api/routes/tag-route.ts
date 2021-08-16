import { Router } from 'express';
import { RoleType } from '../../common/enums/role-type';
import {
  create,
  getAllByWorkspaceId,
  updateNameById,
  deleteById,
} from '../../services/tag.service';
import { run } from '../../common/helpers/route.helper';
import { permit } from '../middlewares/permissions-middleware';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getAllByWorkspaceId(req.workspaceId)),
  )
  .post(
    '/',
    permit(RoleType.ADMIN),
    run((req) => create(req.workspaceId, req.body.name)),
  )
  .put(
    '/:id',
    permit(RoleType.ADMIN),
    run((req) => updateNameById(req.workspaceId, req.params.id, req.body.name)),
  )
  .delete(
    '/:id',
    permit(RoleType.ADMIN),
    run((req) => deleteById(req.params.id)),
  );

export default router;
