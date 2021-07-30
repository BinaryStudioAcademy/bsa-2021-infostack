import { teams } from '../seed-data/team.data';
import { Team } from '../entities/team';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class TeamSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async team => {
      await Object.assign(new Team(), { ...team }).save();
    }, teams);
  }
}
