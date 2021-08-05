import { EntityRepository, Repository } from 'typeorm';
import { UserPermission } from '../entities/user-permission';

@EntityRepository(UserPermission)
class UserPermissionRepository extends Repository<UserPermission> {

  public async findById(
    userId: string,
  ): Promise<UserPermission[]> {
    return this.find({
      relations: ['page'],
      where: { user: userId },
    });
  }
}

export default UserPermissionRepository;
