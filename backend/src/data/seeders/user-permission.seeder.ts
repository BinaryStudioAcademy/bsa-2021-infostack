import { asyncForEach } from '../../common/helpers/array.helper';
import { UserPermission } from '../entities/user-permission';
import { userPermissions } from '../seed-data/user-permission.data';

class UserPermissionSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (userPermission) => {
      await Object.assign(new UserPermission(), {
        user: userPermission.userId,
        page: userPermission.pageId,
        option: userPermission.option,
      }).save();
    }, userPermissions);
  }
}

export default UserPermissionSeeder;
