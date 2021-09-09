import { skills } from '../seed-data/skills.data';
import { Skill } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class SkillSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (skill) => {
      await Object.assign(new Skill(), { ...skill }).save();
    }, skills);
  }
}
