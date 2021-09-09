import { asyncForEach } from '../../common/helpers';
import { Tag } from '../entities';
import { tags } from '../seed-data/tag.data';

export class TagSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (tag) => {
      await Object.assign(new Tag(), { ...tag }).save();
    }, tags);
  }
}
