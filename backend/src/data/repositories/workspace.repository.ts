import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/workspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  findById(id: string): Promise<Workspace> {
    return this.findOne({ id });
  }

  findUsersById(id: string): Promise<Workspace> {
    return this.findOne(
      { id },
      {
        relations: [
          'userWorkspaces',
          'userWorkspaces.user',
          'userWorkspaces.user.teams',
        ],
      },
    );
  }
}

export default WorkspaceRepository;
