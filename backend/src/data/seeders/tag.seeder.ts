import { asyncForEach } from '../../common/helpers/array.helper';
import { Tag } from '../entities/tag';
import { tags } from '../seed-data/tag.data';

class TagSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (tag) => {
      await Object.assign(new Tag(), { ...tag }).save();
    }, tags);
  }
}

export default TagSeeder;
