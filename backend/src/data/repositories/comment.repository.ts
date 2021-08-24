import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
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
    'reactions',
  ];

  public findByPageId(pageId: string): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .where('comment.pageId = :pageId', { pageId })
      .innerJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.reactions', 'reactions')
      .select(this.SELECTION)
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  public findOneById(id: string): Promise<Comment> {
    return this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .innerJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.reactions', 'reactions')
      .select(this.SELECTION)
      .getOne();
  }

  public async deleteById(id: string): Promise<void> {
    this.delete(id);
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

export default CommentRepository;
