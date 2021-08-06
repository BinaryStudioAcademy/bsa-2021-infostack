import { pageContents } from '../seed-data/page-content.data';
import { PageContent } from '../entities/page-content';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class PageContentSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (content) => {
      await Object.assign(new PageContent(), { ...content }).save();
    }, pageContents);
  }
}
