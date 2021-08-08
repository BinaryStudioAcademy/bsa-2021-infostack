import { asyncForEach } from '../../common/helpers/array.helper';
import { UserPermission } from '../entities/user-permission';
import { userPermissions } from '../seed-data/user-permission.data';

class UserPermissionSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (userPermission) => {
      await Object.assign(new UserPermission(), {
        user: { id: userPermission.userId },
        page: { id: userPermission.pageId },
        option: userPermission.option,
      }).save();
    }, userPermissions);
  }
}

export default UserPermissionSeeder;
