import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  createPageSchema,
  setPermissionsSchema,
  createCommentSchema,
} from '../../common/validations';

import {
  createPage,
  deletePage,
  getPages,
  getPinnedPages,
  getMostViewedPages,
  getMostUpdatedPages,
  getСountOfUpdates,
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
  createShareLink,
  shareLinkByEmail,
  getPageShared,
  getTableOfContentsShared,
  getTableOfContentsByPageId,
  getTableOfContentsByPageIdAndVersionId,
  searchPage,
  updateDraft,
  deleteDraft,
  pinPage,
  unpinPage,
  downloadPDF,
  sendPDF,
} from '../../services/page.service';
import {
  getComments,
  addComment,
  deleteComment,
  uploadAudioComment,
  transcriptAudioComment,
} from '../../services/comment.service';
import { validationMiddleware } from '../middlewares';
import { upload } from '../../common/helpers/multer.helper';

const router: Router = Router();

router.get(
  '/search',
  run((req) => searchPage(req.query.query, req.userId, req.workspaceId)),
);

router.get(
  '/most-viewed',
  run((req) =>
    getMostViewedPages(
      req.userId,
      req.workspaceId,
      req.query.dateFrom,
      +req.query.limit,
    ),
  ),
);

router.get(
  '/most-updated',
  run((req) =>
    getMostUpdatedPages(
      req.userId,
      req.workspaceId,
      req.query.dateFrom,
      +req.query.limit,
    ),
  ),
);

router.get(
  '/count-of-updates',
  run((req) =>
    getСountOfUpdates(req.userId, req.workspaceId, req.query.dateFrom),
  ),
);

router.post(
  '/',
  validationMiddleware(createPageSchema),
  run((req) => createPage(req.userId, req.workspaceId, req.body)),
);

router.get(
  '/pinned',
  run((req) => getPinnedPages(req.userId, req.workspaceId)),
);

router.get(
  '/',
  run((req) => getPages(req.userId, req.workspaceId)),
);

router.get(
  '/:id',
  run((req) => getPage(req.params.id, req.userId, req.workspaceId)),
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
  validationMiddleware(setPermissionsSchema),
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
  validationMiddleware(createCommentSchema),
  run((req) =>
    addComment(req.userId, req.params.id, req.workspaceId, req.body, req.io),
  ),
);

router.delete(
  '/:id/comments/:commentId',
  run((req) =>
    deleteComment(req.params.commentId, req.params.id, req.userId, req.io),
  ),
);

router.get(
  '/following/:id',
  run((req) => getPagesFollowedByUser(req.params.id)),
);

router.post(
  '/:id/follow',
  run((req) => followPage(req.userId, req.params.id)),
);

router.post(
  '/follow',
  run((req) => followPages(req.userId, req.body)),
);

router.post(
  '/:id/unfollow',
  run((req) => unfollowPage(req.userId, req.params.id)),
);

router.post(
  '/unfollow',
  run((req) => unfollowPages(req.userId, req.body)),
);

router.post(
  '/:id/version',
  run((req) => updateContent(req.userId, req.body, req.io)),
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

router.post(
  '/:id/upload-audio-comments',
  upload().single('audio'),
  run((req) => uploadAudioComment(req.file)),
);

router.post(
  '/transcript-comments',
  upload().single('audio'),
  run((req) => transcriptAudioComment(req.file)),
);

router.post(
  '/:id/draft',
  run((req) => updateDraft(req.params.id, req.userId, req.body)),
);

router.delete(
  '/:id/draft',
  run((req) => deleteDraft(req.params.id)),
);

router.post(
  '/share/:id',
  run((req) => createShareLink(req.userId, req.body)),
);

router.post(
  '/share-by-email',
  run((req) => shareLinkByEmail(req.body, req.userId)),
);

router.get(
  '/share/link',
  run((req) => getPageShared(req.query.token)),
);

router.get(
  '/table-of-contents/share',
  run((req) => getTableOfContentsShared(req.query.token)),
);

router.post(
  '/:id/pin',
  run((req) => pinPage(req.userId, req.params.id)),
);

router.post(
  '/:id/unpin',
  run((req) => unpinPage(req.userId, req.params.id)),
);

router.get(
  '/:id/download-pdf',
  run((req) => downloadPDF(req.params.id)),
);

router.post(
  '/:id/send-pdf',
  run((req) => sendPDF(req.body, req.params.id)),
);

export default router;
