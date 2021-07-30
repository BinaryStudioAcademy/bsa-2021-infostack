import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAll, create } from '../../services/workspace.service';

const router: Router = Router();

router
  // eslint-disable-next-line no-console
  .get('/', run(req => getAll(req.headers.authorization.split(' ')[1])))
  .post('/', run(req => create(req.headers.authorization.split(' ')[1], req.body)));

export default router;
