import { users } from '../seed-data/user.data';
import { User } from '../entities';
import { asyncForEach } from '../../common/helpers';
import { hash } from '../../common/utils';

export class UserSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (user) => {
      const password = await hash(user.password);
      await Object.assign(new User(), { ...user, password }).save();
    }, users);
  }
}
