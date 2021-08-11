import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createPage,
  getPages,
  getPage,
  getContributors,
  getPagesFollowedByUser,
  followPage,
  unfollowPage,
  updateContent,
} from '../../services/page.service';
import { getComments, addComment } from '../../services/comment.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => getPages(req.userId, req.workspaceId)),
  )
  .get(
    '/:id',
    run((req) => getPage(req.params.id)),
  )
  .get(
    '/:id/contributors',
    run((req) => getContributors(req.params.id)),
  )
  .post(
    '/',
    run((req) => createPage(req.userId, req.workspaceId, req.body)),
  )
  .get(
    '/:id/comments',
    run((req) => getComments(req.params.id)),
  )
  .post(
    '/:id/comments',
    run((req) => addComment(req.userId, req.params.id, req.body, req.io)),
  )
  .get(
    '/following/:id',
    run((req) => getPagesFollowedByUser(req.params.id)),
  )
  .post(
    '/follow/:id',
    run((req) => followPage(req.userId, req.params.id)),
  )
  .post(
    '/unfollow/:id',
    run((req) => unfollowPage(req.userId, req.params.id)),
  )
  .post(
    '/:id/version',
    run((req) => updateContent(req.body)),
  );

router.post(
  '/:id/version',
  run((req) => updateContent(req.body)),
);

export default router;
