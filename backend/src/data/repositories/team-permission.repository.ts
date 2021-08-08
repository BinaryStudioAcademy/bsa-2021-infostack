import { EntityRepository, Repository } from 'typeorm';
import { TeamPermission } from '../entities/team-permission';

@EntityRepository(TeamPermission)
class TeamPermissionRepository extends Repository<TeamPermission> {

  public findByTeamId(
    teamId: string,
  ): Promise<TeamPermission[]> {
    return this.find({
      relations: ['page'],
      where: { team: teamId },
    });
  }
}

export default TeamPermissionRepository;
