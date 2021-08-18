import {
  EntityRepository,
  // In,
  Repository,
  // getTreeRepository
} from 'typeorm';
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

  public findByPageId(pageId: string): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .where('comment.pageId = :pageId', { pageId })
      .innerJoinAndSelect('comment.author', 'author')
      .select(this.SELECTION)
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  public findOneById(id: string): Promise<Comment> {
    return this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .innerJoinAndSelect('comment.author', 'author')
      .select(this.SELECTION)
      .getOne();
  }

  public async deleteById(id: string): Promise<void> {
    // const comment = await this.findOne({ id });

    // const descendants = await getTreeRepository(Comment)
    //   .findDescendants(comment);

    // const descendantIds = descendants
    //   .map((descendant: Comment) => descendant.id);

    // console.log(descendants);

    // await this.createQueryBuilder()
    //   .update(Comment)
    //   .set({ parentCommentId: null })
    //   .where({ id: In(descendantIds) })
    //   .execute();

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
