import { teams } from '../seed-data/team.data';
import { Team } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class TeamSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (team) => {
      await Object.assign(new Team(), { ...team }).save();
    }, teams);
  }
}
