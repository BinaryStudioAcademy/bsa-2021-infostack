import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';
import { Page } from '../entities/page';
import { TeamPermission } from '../entities/team-permission';
import { PermissionType } from '../../common/enums/permission-type';

@EntityRepository(TeamPermission)
class TeamPermissionRepository extends Repository<TeamPermission> {

  public createAndSave(team: Team, page: Page, option: PermissionType): Promise<TeamPermission> {
    const userPermission = this.create({
      team,
      page,
      option,
    });

    return this.manager.save(userPermission);
  }

  public findByTeamId(
    teamId: string,
  ): Promise<TeamPermission[]> {
    return this.find({
      relations: ['page'],
      where: { team: teamId },
    });
  }

  public findByPageId(
    pageId: string,
  ): Promise<TeamPermission[]> {
    return this.find({
      relations: ['team'],
      where: { page: pageId },
    });
  }

  public findByTeamAndPageId(
    teamId: string,
    pageId: string,
  ): Promise<TeamPermission> {
    return this.findOne({
      relations: ['team', 'page'],
      where: { team: teamId, page: pageId },
    });
  }
}

export default TeamPermissionRepository;
