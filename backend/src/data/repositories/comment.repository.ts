import { EntityRepository, Repository } from 'typeorm';
import { IComment } from '../../common/interfaces/comment';
import { Comment } from '../entities/comment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  private readonly SELECTION = [
    'comment.id',
    'comment.text',
    'comment.pageId',
    'comment.parentCommentId',
    'author.avatar',
    'author.id',
    'author.fullName',
  ];

  public async findByPageId(pageId: string): Promise<IComment[]> {
    return this.createQueryBuilder('comment')
      .where('comment.pageId = :pageId', { pageId })
      .innerJoinAndSelect('comment.author', 'author')
      .select(this.SELECTION)
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  public async findOneById(id: string): Promise<IComment> {
    return this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .innerJoinAndSelect('comment.author', 'author')
      .select(this.SELECTION)
      .getOne();
  }
}
export default CommentRepository;
