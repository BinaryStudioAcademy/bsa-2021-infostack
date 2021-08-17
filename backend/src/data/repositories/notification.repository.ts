import { EntityRepository, Repository } from 'typeorm';
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
    read: boolean,
  ): Promise<Notification> {
    const notification = this.create({
      title,
      body,
      type,
      entityTypeId,
      userId,
      read,
    });

    return this.manager.save(notification);
  }

  public findByUserId(userId: string): Promise<Notification[]> {
    return this.find({
      where: { userId },
    });
  }
}

export default NotificationRepository;
