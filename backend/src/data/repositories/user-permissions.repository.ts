import { EntityRepository, AbstractRepository } from 'typeorm';
import { UserPermission } from '../entities/user-permission';
import { User } from '../entities/user';
import { Page } from '../entities/page';
import { PermissionType } from '../../common/enums/permission-type';

@EntityRepository(UserPermission)
export class UserPermissionRepository extends AbstractRepository<UserPermission> {

  createAndSave(user: User, page: Page, option: PermissionType): Promise<UserPermission> {
    const userPermission = this.repository.create({
      user: user,
      page: page,
      option: option,
    });

    return this.manager.save(userPermission);
  }
}
