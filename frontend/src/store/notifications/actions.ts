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

const notificationsActions = {
  ...actions,
  loadNotifications,
  loadCount,
};

export { notificationsActions };
