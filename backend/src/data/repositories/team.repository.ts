import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {
  public findById(id: string): Promise<Team> {
    return this.findOne({ id });
  }

  public findAllByWorkspaceId(workspaceId: string): Promise<Team[]> {
    return this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'users')
      .leftJoinAndSelect('users.userWorkspaces', 'users.userWorkspaces')
      .where('users.userWorkspaces.workspaceId = :workspaceId', { workspaceId })
      .andWhere('team.workspaceId = :id', { id: workspaceId })
      .getMany();
  }

  public findTeamsByIds(teamIds: string[]): Promise<Team[]> {
    if (!teamIds.length) {
      return Promise.resolve([]);
    }

    return this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'users')
      .where('team.id IN(:...ids)', { ids: teamIds })
      .getMany();
  }

  public findByIdWithUsers(id: string, workspaceId: string): Promise<Team> {
    return this.findOne(
      { id, workspaceId },
      {
        relations: ['users'],
      },
    );
  }

  public findByNameInWorkspace(
    name: string,
    workspaceId: string,
  ): Promise<Team> {
    return this.findOne({ name, workspaceId });
  }

  public deleteById(id: string, workspaceId: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .andWhere('workspaceId = :workspaceId', { workspaceId })
      .execute();
  }
}

export default TeamRepository;
