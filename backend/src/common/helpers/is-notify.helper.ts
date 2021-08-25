import { getCustomRepository } from 'typeorm';
import { NotificationSettingsRepository } from '../../data/repositories';
import { NotificationType } from '../enums/notification-type';

export const isNotify = async (
  userId: string,
  notificationType: NotificationType,
): Promise<boolean> => {
  const notificationsSettingsRepository = getCustomRepository(
    NotificationSettingsRepository,
  );

  const disabledNotifications =
    await notificationsSettingsRepository.findAllByUserId(userId);

  const isNotify = !disabledNotifications.find(
    (item) => item.notificationType === notificationType,
  );

  return isNotify;
};

export const isNotifyMany = async (
  userIds: string[],
  notificationType: NotificationType,
): Promise<string[]> => {
  const notificationsSettingsRepository = getCustomRepository(
    NotificationSettingsRepository,
  );

  const disabledNotifications =
    await notificationsSettingsRepository.findByUserIdsAndType(
      userIds,
      notificationType,
    );

  return disabledNotifications.map((setting) => setting.userId);
};
