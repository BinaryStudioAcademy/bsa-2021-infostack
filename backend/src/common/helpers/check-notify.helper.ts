import { getCustomRepository } from 'typeorm';

import { NotificationSettingsRepository } from '../../data/repositories';
import { NotificationType } from '../enums';

export const checkIsNotify = async (
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

export const checkIsNotifyMany = async (
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
