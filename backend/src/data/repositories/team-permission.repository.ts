import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Team } from '../entities/team';
import { Page } from '../entities/page';
import { TeamPermission } from '../entities/team-permission';
import { PermissionType } from '../../common/enums/permission-type';

@EntityRepository(TeamPermission)
class TeamPermissionRepository extends Repository<TeamPermission> {
  public createAndSave(
    team: Team,
    page: Page,
    option: PermissionType,
  ): Promise<TeamPermission> {
    const userPermission = this.create({
      team,
      page,
      option,
    });

    return this.manager.save(userPermission);
  }

  public findAvailablePages(
    teamsIds: string[],
    workspaceId: string,
  ): Promise<{ pageId: string }[]> {
    return this.createQueryBuilder('team_permission')
      .select('team_permission.pageId', 'pageId')
      .leftJoin('team_permission.page', 'page')
      .where('team_permission.teamId IN (:...teamsIds)', { teamsIds })
      .andWhere('page.workspaceId = :workspaceId', { workspaceId })
      .execute();
  }

  public findByTeamId(teamId: string): Promise<TeamPermission[]> {
    return this.find({
      relations: ['page'],
      where: { team: teamId },
    });
  }

  public findByPageId(pageId: string): Promise<TeamPermission[]> {
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

  public deleteByTeamId(teamId: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('teamId = :teamId', { teamId })
      .execute();
  }

  public findByPagesAndUserId(
    pageIds: string[],
    userId: string,
  ): Promise<TeamPermission[]> {
    return this.createQueryBuilder('team_permission')
      .leftJoin('team_permission.team', 'team')
      .leftJoinAndSelect('team_permission.page', 'page')
      .leftJoin('team.users', 'team_users')
      .where('team_users.id = :id', { id: userId })
      .andWhere('team_permission."pageId" IN (:...ids)', { ids: pageIds })
      .getMany();
  }
}

export default TeamPermissionRepository;
