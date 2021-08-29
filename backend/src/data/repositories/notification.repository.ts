import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Notification } from '../entities/notification';
import { EntityType } from '../../common/enums/entity-type';

@EntityRepository(Notification)
class NotificationRepository extends Repository<Notification> {
  public createAndSave(
    title: string,
    body: string,
    type: EntityType,
    entityTypeId: string,
    userId: string,
    workspaceId: string,
    read: boolean,
  ): Promise<Notification> {
    const notification = this.create({
      title,
      body,
      type,
      entityTypeId,
      userId,
      workspaceId,
      read,
    });

    return this.manager.save(notification);
  }

  public createAndSaveMultiple(
    notifications: Partial<Notification>[],
  ): Promise<Notification[]> {
    const created = this.create(notifications);

    return this.manager.save(created);
  }

  public findAllByEntityTypeId(entityTypeId: string): Promise<Notification[]> {
    return this.find({
      where: { entityTypeId },
    });
  }

  public findAllByUserIdAndWorkspaceId(
    userId: string,
    workspaceId: string,
  ): Promise<Notification[]> {
    return this.find({
      where: { userId, workspaceId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public findSomeByUserIdAndWorkspaceId(
    userId: string,
    workspaceId: string,
    skip: number,
    limit: number,
  ): Promise<Notification[]> {
    if (limit) {
      return this.find({
        where: { userId, workspaceId },
        skip: skip,
        take: limit,
        order: {
          createdAt: 'DESC',
        },
      });
    } else {
      return this.find({
        where: { userId, workspaceId },
        skip: skip,
        order: {
          createdAt: 'DESC',
        },
      });
    }
  }

  public findById(id: string): Promise<Notification> {
    return this.findOne({ id });
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}

export default NotificationRepository;
