import { EntityRepository, Repository } from 'typeorm';

import { Reaction } from '../entities';

@EntityRepository(Reaction)
class CommentReactionRepository extends Repository<Reaction> {}

export { CommentReactionRepository };
