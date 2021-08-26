import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { NotificationSettings } from '../entities/notification-settings';
import { NotificationType } from '../../common/enums/notification-type';

@EntityRepository(NotificationSettings)
class NotificationSettingsRepository extends Repository<NotificationSettings> {
  public createAndSave(
    userId: string,
    notificationType: NotificationType,
  ): Promise<NotificationSettings> {
    const notificationSettings = this.create({
      userId,
      notificationType,
    });

    return this.manager.save(notificationSettings);
  }

  public findAllByUserId(userId: string): Promise<NotificationSettings[]> {
    return this.find({
      where: { userId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findByUserIdsAndType(
    userIds: string[],
    type: NotificationType,
  ): Promise<NotificationSettings[]> {
    return this.createQueryBuilder()
      .where('"notificationType" = :type', { type })
      .andWhere('"userId" IN (:...ids)', { ids: userIds })
      .getMany();
  }

  public deleteByUserIdAndNotificationType(
    userId: string,
    notificationType: NotificationType,
  ): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('userId = :userId AND notificationType = :notificationType', {
        userId,
        notificationType,
      })
      .execute();
  }
}

export default NotificationSettingsRepository;
