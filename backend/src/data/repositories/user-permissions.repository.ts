import { EntityRepository, AbstractRepository } from 'typeorm';
import { UserPermission } from '../entities/user-permission';
import { User } from '../entities/user';
import { Page } from '../entities/page';
import { PermissionOption } from '../entities/enums/permission-option';

@EntityRepository(UserPermission)
export class UserPermissionRepository extends AbstractRepository<UserPermission> {

  createAndSave(user: User, page: Page, option: PermissionOption): Promise<UserPermission> {
    const userPermission = this.repository.create({
      user: user,
      page: page,
      option: option,
    });

    return this.manager.save(userPermission);
  }
}
