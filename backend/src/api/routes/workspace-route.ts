import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAll, create } from '../../services/workspace.service';

const router: Router = Router();

router
  .get('/', run(() => getAll()))
  .post('/', run(req => create(req.body)));

export default router;
