import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { createPage, createVersionPage, getPages, getPage } from '../../services/page.service';

const router: Router = Router();

router
  .post('/', authMiddleware, workspaceMiddleware,
    run(req => createPage(req.userId, req.workspaceId, req.body)));

router
  .post('/:id/version',
    run(req => createVersionPage(req)));

router
  .get('/',
    run(req => getPages(req)));

router
  .get('/:id', authMiddleware, workspaceMiddleware,
    run(req => getPage(req.workspaceId, req.params.id)));

export default router;
