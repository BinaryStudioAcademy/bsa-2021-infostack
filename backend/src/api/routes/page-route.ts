import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { createPage, getPages, getPage } from '../../services/page.service';
import { getComments, addComment } from '../../services/comment.service';

const router: Router = Router();

router
  .get('/', run(req => getPages(req.userId, req.workspaceId)))
  .get('/:id', run(req => getPage(req.workspaceId, req.params.id)))
  .post('/', run(req => createPage(req.userId, req.workspaceId, req.body)))
  .get('/:id/comments', run(req => getComments(req.params.id)))
  .post('/:id/comments', run(req => addComment(req.userId, req.params.id, req.body, req.io)));

export default router;
