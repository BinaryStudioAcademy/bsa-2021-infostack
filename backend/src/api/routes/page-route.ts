import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { createPage, getPages, getPage, getPagesFollowedByUser, followPage, unfollowPage } from '../../services/page.service';

const router: Router = Router();

router
  .post('/', run(req => createPage(req.userId, req.workspaceId, req.body)));

router
  .get('/', run(req => getPages(req.userId, req.workspaceId)));

router
  .get('/:id', run(req => getPage(req.workspaceId, req.params.id)));

router
  .get('/following/:id', run(req => getPagesFollowedByUser(req.params.id)));

router
  .post('/follow/:id', run(req => followPage(req.userId, req.params.id)));

router
  .post('/unfollow/:id', run(req => unfollowPage(req.userId, req.params.id)));

export default router;
