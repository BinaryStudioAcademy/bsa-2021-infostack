import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getSomething } from '../../services/workspace.service';

const router: Router = Router();

router
  .get('/', run(req => getSomething(req.query)))
  .get('/users', run(req => getSomething(req.query)))
  .get('/teams', run(req => getSomething(req.query)))
  .get('/tags', run(req => getSomething(req.query)))
  .get('/integrations', run(req => getSomething(req.query)))
  .get('/profile', run(req => getSomething(req.query)));

export default router;
