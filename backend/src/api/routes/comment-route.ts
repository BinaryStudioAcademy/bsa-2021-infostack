import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  handleCommentReaction,
  getAllCommentReactions,
} from '../../services/comment.service';

const router: Router = Router({ mergeParams: true });

router.get(
  '/:id/reactions',
  run((req) => getAllCommentReactions(req.params.id)),
);

router.post(
  '/:id/reactions',
  run((req) => handleCommentReaction(req.params.id, req)),
);

export default router;
