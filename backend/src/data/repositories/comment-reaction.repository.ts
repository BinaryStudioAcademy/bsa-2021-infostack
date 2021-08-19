import { EntityRepository, Repository, In } from 'typeorm';
import { Reaction } from '../entities/reaction';

@EntityRepository(Reaction)
class CommentReactionRepository extends Repository<Reaction> {
  public getAllReactionsByCommentId(commentId: string): Promise<Reaction[]> {
    return this.find({ commentId });
  }

  public getReactionsById(ids: string[]): Promise<Reaction[]> {
    return this.find({ where: { id: In(ids) } });
  }

  public findById(id: string): Promise<Reaction> {
    return this.findOne({ id });
  }
}

export default CommentReactionRepository;
