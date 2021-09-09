import { EntityRepository, Repository } from 'typeorm';

import { Draft } from '../entities';

@EntityRepository(Draft)
class DraftRepository extends Repository<Draft> {}

export { DraftRepository };
