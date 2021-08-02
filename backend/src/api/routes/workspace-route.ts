import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAll, create } from '../../services/workspace.service';

const router: Router = Router();

router
  .get('/', run(req => getAll(req.userId)))
  .post('/', run(req => create(req.userId, req.body)));

export default router;
