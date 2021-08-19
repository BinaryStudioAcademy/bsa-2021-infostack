import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getAllCommentReactions,
  handleCommentReaction,
} from '../../services/comment-reaction.service';

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
