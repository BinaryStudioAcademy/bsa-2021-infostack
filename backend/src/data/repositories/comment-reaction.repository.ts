import { EntityRepository, Repository } from 'typeorm';
import { Reaction } from '../entities/reaction';

@EntityRepository(Reaction)
class CommentReactionRepository extends Repository<Reaction> {}

export default CommentReactionRepository;
