import { getCustomRepository } from 'typeorm';

import { teamPermissions } from '../seed-data/team-permission.data';
import { TeamPermission } from '../entities';
import { asyncForEach } from '../../common/helpers';
import { TeamRepository, PageRepository } from '../repositories';
import { PermissionType } from '../../common/enums';

export class TeamPermissionSeeder {
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
