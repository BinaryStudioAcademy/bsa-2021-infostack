import { users } from '../seed-data/user.data';
import { User } from '../entities/user';
import { asyncForEach } from '../../common/helpers/array.helper';
import { hash } from '../../common/utils/hash.util';

export default class UserSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async user => {
      const password = await hash(user.password);
      await Object.assign(new User(), { ...user, password }).save();
    }, users);
  }
}
