import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Comment } from '../entities/comment';
import { User } from '../entities/user';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  private readonly SELECTION = [
    'comment.id',
    'comment.createdAt',
    'comment.text',
    'comment.pageId',
    'comment.parentCommentId',
    'comment.voiceRecord',
    'author.avatar',
    'author.id',
    'author.fullName',
    'author.email',
    'reactions',
    'user.fullName',
  ];

  public findByPageId(pageId: string): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .where('comment.pageId = :pageId', { pageId })
      .innerJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.reactions', 'reactions')
      .leftJoinAndSelect('reactions.user', 'user')
      .select(this.SELECTION)
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  public findById(id: string): Promise<Comment> {
    return this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .innerJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.reactions', 'reactions')
      .leftJoinAndSelect('reactions.user', 'user')
      .select(this.SELECTION)
      .getOne();
  }

  public findAuthor(id: string): Promise<User> {
    return this.createQueryBuilder()
      .relation(Comment, 'author')
      .of(id)
      .loadOne();
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
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
