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
      .where('users.userWorkspaces.workspaceId = :id', { id: workspaceId })
      .where('team.workspaceId = :id', { id: workspaceId })
      .getMany();
  }

  public findByIdWithUsers(id: string): Promise<Team> {
    return this.findOne(
      { id },
      {
        relations: ['users'],
      },
    );
  }

  public findByName(name: string): Promise<Team> {
    return this.findOne({ name });
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}

export default TeamRepository;
