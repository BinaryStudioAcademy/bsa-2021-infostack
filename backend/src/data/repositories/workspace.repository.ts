import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/workspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {

}

export default WorkspaceRepository;
