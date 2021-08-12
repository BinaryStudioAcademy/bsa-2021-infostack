import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user.repository';
import PageRepository from '../repositories/page.repository';
import { userFollowingPages } from '../seed-data/user-following-pages.data';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class UserFollowingPagesSeeder {
  public static async execute(): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const pageRepository = getCustomRepository(PageRepository);
    await asyncForEach(async (userFollowingPage) => {
      const user = await userRepository.findById(userFollowingPage.userId);
      const page = await pageRepository.findById(userFollowingPage.pageId);
      if (!page.followingUsers) {
        page.followingUsers = [];
      }
      if (!user.followingPages) {
        user.followingPages = [];
      }
      page.followingUsers.push(user);
      user.followingPages.push(page);
      await userRepository.save(user);
      await pageRepository.save(page);
    }, userFollowingPages);
  }
}
