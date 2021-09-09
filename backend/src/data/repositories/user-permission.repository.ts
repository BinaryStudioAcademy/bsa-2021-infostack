import { EntityRepository, In, Repository } from 'typeorm';

import { UserPermission, User, Page } from '../entities';
import { PermissionType } from '../../common/enums';

@EntityRepository(UserPermission)
class UserPermissionRepository extends Repository<UserPermission> {
  public createAndSave(
    user: User,
    page: Page,
    option: PermissionType,
  ): Promise<UserPermission> {
    const userPermission = this.create({
      user,
      page,
      option,
    });

    return this.manager.save(userPermission);
  }

  public findAvailablePages(
    userId: string,
    workspaceId: string,
  ): Promise<{ pageId: string }[]> {
    return this.createQueryBuilder('user_permission')
      .select('user_permission.pageId', 'pageId')
      .leftJoin('user_permission.page', 'page')
      .where('user_permission.userId = :userId', { userId })
      .andWhere('page.workspaceId = :workspaceId', { workspaceId })
      .execute();
  }

  public findByUserId(userId: string): Promise<UserPermission[]> {
    return this.find({
      relations: ['page'],
      where: { user: userId },
    });
  }

  public findByPageId(pageId: string): Promise<UserPermission[]> {
    return this.find({
      relations: ['user'],
      where: { page: pageId },
    });
  }

  public findByUserAndPageId(
    userId: string,
    pageId: string,
  ): Promise<UserPermission> {
    return this.findOne({
      relations: ['user', 'page'],
      where: { user: userId, page: pageId },
    });
  }

  public findByUserAndPageIds(
    userId: string,
    pageIds: string[],
  ): Promise<UserPermission[]> {
    return this.find({
      relations: ['user', 'page'],
      where: { user: userId, page: In(pageIds) },
    });
  }
}

export { UserPermissionRepository };
