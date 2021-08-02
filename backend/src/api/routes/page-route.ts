import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { createPage, createVersionPage, getPages, getPage } from '../../services/page.service';

const router: Router = Router();

router
  .post('/',
    run(req => createPage(req)));

router
  .post('/:id/version',
    run(req => createVersionPage(req)));

router
  .get('/',
    run(req => getPages(req)));

router
  .get('/:id',
    run(req => getPage(req)));

export default router;
