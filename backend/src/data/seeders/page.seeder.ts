import { pages } from '../seed-data/page.data';
import { Page } from '../entities/page';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class PageSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async page => {
      await Object.assign(new Page(), { ...page }).save();
    }, pages);
  }
}
