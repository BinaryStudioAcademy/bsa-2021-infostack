import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { NotificationApi } from 'services';
import { IQuery } from 'common/interfaces/query';

const loadNotifications = createAsyncThunk(
  ActionType.SET_NOTIFICATIONS,
  async (query: IQuery | undefined, { dispatch }) => {
    const notifications = await new NotificationApi().get(query);
    dispatch(actions.setNotifications(notifications));
  },
);

const loadMoreNotifications = createAsyncThunk(
  ActionType.ADD_NOTIFICATIONS,
  async (query: IQuery | undefined, { dispatch }) => {
    const notifications = await new NotificationApi().get(query);
    dispatch(actions.addNotifications(notifications));
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
  loadMoreNotifications,
  loadCount,
  readAllNotifications,
  readNotification,
};

export { notificationsActions };
