import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getPages } from '../../services/page.service';

const router: Router = Router();

router
  .get('/', run(req => getPages(req.userId, req.workspaceId)));

export default router;
