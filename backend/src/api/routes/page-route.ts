import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { createPage, getPages, getPage, getPagesFollowedByUser } from '../../services/page.service';

const router: Router = Router();

router
  .post('/', run(req => createPage(req.userId, req.workspaceId, req.body)));

router
  .get('/', run(req => getPages(req.userId, req.workspaceId)));

router
  .get('/:id', run(req => getPage(req.workspaceId, req.params.id)));

router
  .get('/following/:id', run(req => getPagesFollowedByUser(req.params.id)));

export default router;
