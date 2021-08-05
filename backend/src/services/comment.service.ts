import { getRepository } from 'typeorm';
import { Comment } from '../data/entities/comment';
import { ICommentRequest, ICommentResponse } from '../common/interfaces/comment/comment.interface';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { HttpError } from '../common/errors/http-error';

export const getComments = async (pageId: string): Promise<Comment[]> =>
  await getRepository(Comment)
    .find({ where: { pageId } });

export const addComment = async (
  userId: string, pageId: string, { text, parentCommentId }: ICommentRequest,
): Promise<ICommentResponse> => {
  const commentRepository = getRepository(Comment);

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

  return await commentRepository.save({
    authorId: userId,
    pageId,
    text,
    parentCommentId,
  });
};
