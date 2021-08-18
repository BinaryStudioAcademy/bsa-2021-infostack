import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comment';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private readonly SELECTION = [
    'comment.id',
    'comment.createdAt',
    'comment.text',
    'comment.pageId',
    'comment.parentCommentId',
    'author.avatar',
    'author.id',
    'author.fullName',
    'author.email',
  ];

  public async findByPageId(pageId: string): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .where('comment.pageId = :pageId', { pageId })
      .innerJoinAndSelect('comment.author', 'author')
      .select(this.SELECTION)
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  public async findOneById(id: string): Promise<Comment> {
    return this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .innerJoinAndSelect('comment.author', 'author')
      .select(this.SELECTION)
      .getOne();
  }

  public async findPageByCommentId(id: string): Promise<Comment> {
    return this.findOne(
      { id },
      {
        relations: ['page', 'page.followingUsers'],
      },
    );
  }
}
