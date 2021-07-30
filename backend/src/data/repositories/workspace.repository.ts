import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/workspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  public async findById(id: string):Promise<Workspace> {
    return await this.findOne({ id });
  }
}

export default WorkspaceRepository;
