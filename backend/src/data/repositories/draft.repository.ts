import { EntityRepository, Repository } from 'typeorm';
import { Draft } from '../entities/draft';

@EntityRepository(Draft)
class DraftRepository extends Repository<Draft> {}

export default DraftRepository;
