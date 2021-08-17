import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { NotificationApi } from 'services';

const loadNotifications = createAsyncThunk(
  ActionType.SET_NOTIFICATIONS,
  async (limit: number | undefined, { dispatch }) => {
    const notifications = await new NotificationApi().get(limit);
    dispatch(actions.setNotifications(notifications));
  },
);

const loadCount = createAsyncThunk(
  ActionType.SET_COUNT,
  async (_, { dispatch }) => {
    const { count } = await new NotificationApi().getCount();
    dispatch(actions.setCount(count));
  },
);

const readAllNotifications = createAsyncThunk(
  ActionType.SET_NOTIFICATIONS,
  async (_, { dispatch }) => {
    const notifications = await new NotificationApi().readAll();
    dispatch(actions.setNotifications(notifications));
    dispatch(actions.setCount(0));
  },
);

const readNotification = createAsyncThunk(
  ActionType.UPDATE_NOTIFICATION,
  async (id: string, { dispatch }) => {
    const notification = await new NotificationApi().read(id);
    dispatch(actions.updateNotification(notification));
    dispatch(actions.decrementCount());
  },
);

const notificationsActions = {
  ...actions,
  loadNotifications,
  loadCount,
  readAllNotifications,
  readNotification,
};

export { notificationsActions };
