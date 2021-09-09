import { getCustomRepository } from 'typeorm';

import { NotificationType } from '../common/enums';
import { NotificationSettingsRepository } from '../data/repositories';

export const getNotificationsSettings = async (
  userId: string,
): Promise<string[]> => {
  const notificationSettingsRepository = getCustomRepository(
    NotificationSettingsRepository,
  );

  const notificationsSettings =
    await notificationSettingsRepository.findAllByUserId(userId);

  const notifiactionsSettingsMapped = notificationsSettings.map(
    (item) => item.notificationType,
  );

  return notifiactionsSettingsMapped;
};

export const createNotificationSettings = async (
  userId: string,
  notificationType: { notificationType: NotificationType },
): Promise<string> => {
  const notificationSettingsRepository = getCustomRepository(
    NotificationSettingsRepository,
  );

  const notificationSettings =
    await notificationSettingsRepository.createAndSave(
      userId,
      notificationType.notificationType,
    );

  return notificationSettings.notificationType;
};

export const deleteNotificationSettings = async (
  userId: string,
  notificationType: { notificationType: NotificationType },
): Promise<void> => {
  const notificationSettingsRepository = getCustomRepository(
    NotificationSettingsRepository,
  );

  await notificationSettingsRepository.deleteByUserIdAndNotificationType(
    userId,
    notificationType.notificationType,
  );
};
