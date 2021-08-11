import { EntityRepository, Repository } from 'typeorm';
import { Workspace } from '../entities/workspace';

@EntityRepository(Workspace)
class WorkspaceRepository extends Repository<Workspace> {
  public findById(id: string): Promise<Workspace> {
    return this.findOne({ id });
  }

  public findByName(name: string): Promise<Workspace> {
    return this.findOne({ name });
  }

  public findByIdWithUsers(id: string): Promise<Workspace> {
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

  public findByIdWithTeams(id: string): Promise<Workspace> {
    return this.findOne(
      { id },
      {
        relations: ['teams', 'teams.users'],
      },
    );
  }
}

export default WorkspaceRepository;
