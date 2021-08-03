import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/workspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  public findById(id: string):Promise<Workspace> {
    return this.findOne({ id });
  }
}

export default WorkspaceRepository;
