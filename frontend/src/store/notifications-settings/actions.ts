import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { NotificationSettingsApi } from 'services';
import { NotificationType } from 'common/enums/enums';

const notificationSettingsApi = new NotificationSettingsApi();

const loadNotifications = createAsyncThunk(
  ActionType.SET_NOTIFICATIONS_SETTINGS,
  async (payload: undefined, { dispatch }) => {
    const notifications =
      await notificationSettingsApi.getNotificationsSettings();

    dispatch(actions.setNotificationsSettings(notifications));
  },
);

const createNotificationSetting = createAsyncThunk(
  ActionType.CREATE_NOTIFICATION_SETTING,
  async (notificationType: NotificationType, { dispatch }) => {
    await notificationSettingsApi.createNotificationSettings(notificationType);

    dispatch(actions.createNotificationSetting(notificationType));
  },
);

const deleteNotificationSetting = createAsyncThunk(
  ActionType.CREATE_NOTIFICATION_SETTING,
  async (notificationType: NotificationType, { dispatch }) => {
    await notificationSettingsApi.deleteNotificationSettings(notificationType);

    dispatch(actions.deleteNotificationSetting(notificationType));
  },
);

const notificationsSettingsActions = {
  ...actions,
  loadNotifications,
  createNotificationSetting,
  deleteNotificationSetting,
};

export { notificationsSettingsActions };
