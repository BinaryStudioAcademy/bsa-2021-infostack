import { teamPermissions } from '../seed-data/team-permission.data';
import { TeamPermission } from '../entities/team-permission';
import { asyncForEach } from '../../common/helpers/array.helper';
import { getCustomRepository } from 'typeorm';
import TeamRepository from '../repositories/team.repository';
import PageRepository from '../repositories/page.repository';
import { PermissionType } from '../../common/enums/permission-type';

export default class TeamPermissionSeeder {
  public static async execute(): Promise<void> {
    const teamRepository = getCustomRepository(TeamRepository);
    const pageRepository = getCustomRepository(PageRepository);
    await asyncForEach(async (teamPermission) => {
      const team_permission = new TeamPermission();
      team_permission.team = await teamRepository.findById(
        teamPermission.teamId,
      );
      team_permission.page = await pageRepository.findById(
        teamPermission.pageId,
      );
      let option;
      Object.values(PermissionType).forEach((optionEnum) =>
        teamPermission.option === optionEnum ? (option = optionEnum) : null,
      );
      team_permission.option = option;
      await TeamPermission.save(team_permission);
    }, teamPermissions);
  }
}
