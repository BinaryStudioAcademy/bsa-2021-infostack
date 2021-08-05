import { getCustomRepository, getRepository } from 'typeorm';
import { comments } from '../seed-data/comment.data';
import { Comment } from '../entities/comment';
import { asyncForEach } from '../../common/helpers/array.helper';
import PageRepository from '../repositories/page-repository';
import UserRepository from '../repositories/user.repository';

export default class CommentSeeder {
  public static async execute(): Promise<void> {
    const pageRepository = getCustomRepository(PageRepository);
    const userRepository = getCustomRepository(UserRepository);
    const commentRepository = getRepository(Comment);

    await asyncForEach(async comment => {
      const page = await pageRepository.findById(comment.pageId);
      const user = await userRepository.findById(comment.authorId);
      const parentComment = comment.parentCommentId
        ? await commentRepository.findOne({ id: comment.parentCommentId })
        : null;

      await Object.assign(new Comment(), {
        ...comment,
        pageId: page,
        authorId: user,
        parentCommentId: parentComment,
      }).save();
    }, comments);
  }
}
