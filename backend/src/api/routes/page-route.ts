import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createPage,
  deletePage,
  getPages,
  getPage,
  getPermissions,
  setPermission,
  deletePermission,
  getContributors,
  getPagesFollowedByUser,
  followPage,
  followPages,
  unfollowPage,
  unfollowPages,
  updateContent,
  getTags,
  savePageTags,
  getTableOfContentsByPageId,
  getTableOfContentsByPageIdAndVersionId,
} from '../../services/page.service';
import { getComments, addComment } from '../../services/comment.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => createPage(req.userId, req.workspaceId, req.body)),
);

router.get(
  '/',
  run((req) => getPages(req.userId, req.workspaceId)),
);

router.get(
  '/:id',
  run((req) => getPage(req.params.id, req.userId)),
);

router.delete(
  '/:id',
  run((req) => deletePage(req.params.id)),
);

router.get(
  '/:id/permissions',
  run((req) => getPermissions(req.params.id)),
);

router.post(
  '/:id/permissions',
  run((req) => setPermission(req.workspaceId, req.params.id, req.body)),
);

router.delete(
  '/:id/permissions/:participantType/:participiantId',
  run((req) =>
    deletePermission(
      req.params.id,
      req.params.participantType,
      req.params.participiantId,
      req.workspaceId,
    ),
  ),
);

router.get(
  '/:id/contributors',
  run((req) => getContributors(req.params.id)),
);

router.post(
  '/',
  run((req) => createPage(req.userId, req.workspaceId, req.body)),
);

router.get(
  '/:id/comments',
  run((req) => getComments(req.params.id)),
);

router.post(
  '/:id/comments',
  run((req) => addComment(req.userId, req.params.id, req.body, req.io)),
);

router.get(
  '/following/:id',
  run((req) => getPagesFollowedByUser(req.params.id)),
);

router.post(
  '/follow/:id',
  run((req) => followPage(req.userId, req.params.id)),
);

router.post(
  '/follow',
  run((req) => followPages(req.userId, req.body)),
);

router.post(
  '/unfollow/:id',
  run((req) => unfollowPage(req.userId, req.params.id)),
);

router.post(
  '/unfollow',
  run((req) => unfollowPages(req.userId, req.body)),
);

router.post(
  '/:id/version',
  run((req) => updateContent(req.userId, req.body)),
);

router.get(
  '/:id/tags',
  run((req) => getTags(req.params.id)),
);

router.post(
  '/:id/tags',
  run((req) => savePageTags(req.params.id, req.body)),
);

router.get(
  '/:id/table-of-contents',
  run((req) => getTableOfContentsByPageId(req.params.id)),
);

router.get(
  '/:id/version/:versionId/table-of-contents',
  run((req) =>
    getTableOfContentsByPageIdAndVersionId(req.params.id, req.params.versionId),
  ),
);

export default router;
