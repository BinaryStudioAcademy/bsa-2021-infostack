import { Router } from 'express';

import { run } from '../../common/helpers';
import {
  getAllByWorkspaceId,
  create,
  deleteById,
  updateNameById,
} from '../../services/skill.service';
import { permit } from '../middlewares';
import { RoleType } from '../../common/enums';

const router: Router = Router();

router.get(
  '/',
  run((req) => getAllByWorkspaceId(req.workspaceId)),
);

router.post(
  '/',
  run((req) => create(req.workspaceId, req.body.name)),
);

router.delete(
  '/:id',
  permit(RoleType.ADMIN),
  run((req) => deleteById(req.params.id)),
);

router.put(
  '/:id',
  permit(RoleType.ADMIN),
  run((req) => updateNameById(req.workspaceId, req.params.id, req.body.name)),
);

export default router;
