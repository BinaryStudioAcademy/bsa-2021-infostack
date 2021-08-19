import { EntityRepository, Repository } from 'typeorm';
import { Reaction } from '../entities/reaction';

@EntityRepository(Reaction)
class CommentReactionRepository extends Repository<Reaction> {
  public getAllReactionsByCommentId(commentId: string): Promise<Reaction[]> {
    return this.find({ commentId });
  }
}

export default CommentReactionRepository;
