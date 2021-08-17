import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { NotificationApi } from 'services';

const loadNotifications = createAsyncThunk(
  ActionType.SET_NOTIFICATIONS,
  async (_, { dispatch }) => {
    const notifications = await new NotificationApi().getAll();
    dispatch(actions.setNotifications(notifications));
    dispatch(actions.setCount(notifications.length));
  },
);

const notificationsActions = {
  ...actions,
  loadNotifications,
};

export { notificationsActions };
