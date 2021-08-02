import { Router } from 'express';
import { RoleType } from 'infostack-shared';
import { run } from '../../common/helpers/route.helper';
import { IRequestWithUser } from '../../common/models/user/request-with-user.interface';
import { getWorkspaceUsers } from '../../services/workspace.service';
import { auth } from '../middlewares/authorization-middleware';
import { permit } from '../middlewares/permissions-middleware';

const router: Router = Router();

router.get(
  '/users',
  auth,
  permit(RoleType.ADMIN),
  run((req: IRequestWithUser) => getWorkspaceUsers(req.workspaceId)),
);

export default router;
