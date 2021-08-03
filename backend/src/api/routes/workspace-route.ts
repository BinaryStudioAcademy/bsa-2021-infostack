import { Router } from 'express';
import { RoleType } from 'infostack-shared';
import { run } from '../../common/helpers/route.helper';
import { IRequestWithUser } from '../../common/models/user/request-with-user.interface';
import {
  getWorkspaceUsers,
  getAll,
  create,
} from '../../services/workspace.service';
import { auth } from '../middlewares/authorization-middleware';
import { permit } from '../middlewares/permissions-middleware';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getAll(req.userId)),
  )
  .post(
    '/',
    run((req) => create(req.userId, req.body)),
  )
  .get(
    '/users',
    auth,
    permit(RoleType.ADMIN),
    run((req: IRequestWithUser) => getWorkspaceUsers(req.workspaceId)),
  );

export default router;
