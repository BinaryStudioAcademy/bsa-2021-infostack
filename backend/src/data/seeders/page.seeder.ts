import { pages } from '../seed-data/page.data';
import { Page, UserPermission } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class PageSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (page) => {
      const { id: pageId, authorId: userId } = page;

      await Object.assign(new Page(), { ...page }).save();
      await Object.assign(new UserPermission(), {
        user: { id: userId },
        page: { id: pageId },
        option: 'admin',
      }).save();
    }, pages);
  }
}
