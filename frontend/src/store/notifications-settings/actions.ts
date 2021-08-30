import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { notificationSettingsApi } from 'services';
import { NotificationType } from 'common/enums';

const loadNotificationsSettings = createAsyncThunk(
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
  ActionType.DELETE_NOTIFICATION_SETTING,
  async (notificationType: NotificationType, { dispatch }) => {
    await notificationSettingsApi.deleteNotificationSettings(notificationType);

    dispatch(actions.deleteNotificationSetting(notificationType));
  },
);

const notificationsSettingsActions = {
  ...actions,
  loadNotificationsSettings,
  createNotificationSetting,
  deleteNotificationSetting,
};

export { notificationsSettingsActions };
