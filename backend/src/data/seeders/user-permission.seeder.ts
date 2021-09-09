import { asyncForEach } from '../../common/helpers';
import { UserPermission } from '../entities';
import { userPermissions } from '../seed-data/user-permission.data';

export class UserPermissionSeeder {
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
