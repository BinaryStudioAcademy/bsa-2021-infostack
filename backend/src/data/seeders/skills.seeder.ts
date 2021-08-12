import { skills } from '../seed-data/skills.data';
import { Skill } from '../entities/skill';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class SkillSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (skill) => {
      await Object.assign(new Skill(), { ...skill }).save();
    }, skills);
  }
}
