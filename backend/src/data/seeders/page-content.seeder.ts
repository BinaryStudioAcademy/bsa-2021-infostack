import { pageContents } from '../seed-data/page-content.data';
import { PageContent } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class PageContentSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (content) => {
      await Object.assign(new PageContent(), { ...content }).save();
    }, pageContents);
  }
}
