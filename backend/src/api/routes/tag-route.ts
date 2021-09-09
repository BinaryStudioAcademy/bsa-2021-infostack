import { Router } from 'express';

import { run } from '../../common/helpers';
import {
  create,
  getAllByWorkspaceId,
  updateNameById,
  deleteById,
} from '../../services/tag.service';
import { permit } from '../middlewares';
import { RoleType } from '../../common/enums';

const router: Router = Router();

router.get(
  '/',
  run((req) => getAllByWorkspaceId(req.workspaceId)),
);

router.post(
  '/',
  permit(RoleType.ADMIN),
  run((req) => create(req.workspaceId, req.body.name)),
);

router.put(
  '/:id',
  permit(RoleType.ADMIN),
  run((req) => updateNameById(req.workspaceId, req.params.id, req.body.name)),
);

router.delete(
  '/:id',
  permit(RoleType.ADMIN),
  run((req) => deleteById(req.params.id)),
);

export default router;
