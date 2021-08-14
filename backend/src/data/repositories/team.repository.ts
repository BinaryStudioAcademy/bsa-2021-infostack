import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {
  public findById(id: string): Promise<Team> {
    return this.findOne({ id });
  }

  public findAllByWorkspaceId(workspaceId: string): Promise<Team[]> {
    return this.find({
      where: {
        workspaceId: workspaceId,
      },
      relations: ['users'],
    });
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
