import { getCustomRepository } from 'typeorm';
import CommentReactionRepository from '../data/repositories/comment-reaction.repository';
import { CommentRepository } from '../data/repositories/comment.repository';
import { ICommentReaction } from '../common/interfaces/comment-reaction';
import { IRequestWithUser } from '../common/interfaces/http/request-with-user.interface';

export const getAllCommentReactions = async (
  commentId: string,
): Promise<ICommentReaction[]> => {
  const commentReactionRepository = getCustomRepository(
    CommentReactionRepository,
  );
  const reactions = await commentReactionRepository.getAllReactionsByCommentId(
    commentId,
  );

  return reactions;
};

export const handleCommentReaction = async (
  commentId: string,
  req: IRequestWithUser,
): Promise<ICommentReaction[]> => {
  const { userId, body } = req;
  const { reaction } = body;

  const commentReactionRepository = getCustomRepository(
    CommentReactionRepository,
  );
  const foundReaction = await commentReactionRepository.findOne({
    where: { commentId, userId, reaction },
  });

  if (foundReaction) {
    await commentReactionRepository.remove(foundReaction);
  } else {
    await commentReactionRepository.save({ commentId, userId, reaction });
  }

  const commentRepository = getCustomRepository(CommentRepository);
  const comment = await commentRepository.findOneById(commentId);
  const { reactions } = comment;

  return reactions;
};
