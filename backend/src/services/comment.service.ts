import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import {
  ICommentRequest,
  IComment,
} from '../common/interfaces/comment/comment.interface';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { HttpError } from '../common/errors/http-error';
import { CommentRepository } from '../data/repositories/comment.repository';
import { mapChildToParent } from '../common/mappers/comment/map-child-to-parent';

export const getComments = async (pageId: string): Promise<IComment[]> => {
  const comments = await getCustomRepository(CommentRepository).findByPageId(
    pageId,
  );
  return mapChildToParent(comments);
};

export const addComment = async (
  userId: string,
  pageId: string,
  { text, parentCommentId }: ICommentRequest,
  io: Server,
): Promise<IComment> => {
  const commentRepository = getCustomRepository(CommentRepository);

  if (parentCommentId) {
    const isParentCommentIdGenuine = await commentRepository.findOne({
      where: { id: parentCommentId },
    });

    if (!isParentCommentIdGenuine) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_SUCH_PARENT_COMMENT,
      });
    }
  }

  const { id } = await commentRepository.save({
    authorId: userId,
    pageId,
    text,
    parentCommentId,
  });

  const comment = await commentRepository.findOneById(id);

  io.to(pageId).emit('page/newComment', comment);

  return comment;
};
