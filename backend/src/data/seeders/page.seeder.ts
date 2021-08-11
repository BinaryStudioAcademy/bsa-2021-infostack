import { pages } from '../seed-data/page.data';
import { Page } from '../entities/page';
import { UserPermission } from '../entities/user-permission';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class PageSeeder {
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
