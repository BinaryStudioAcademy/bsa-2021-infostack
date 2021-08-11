import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { WorkspaceApi } from 'services';

const loadUsers = createAsyncThunk(
  ActionType.SET_USERS,
  async (_, { dispatch }): Promise<void> => {
    const response = await new WorkspaceApi().getUsers();
    dispatch(actions.setUsers(response));
  },
);

const usersActions = {
  ...actions,
  loadUsers,
};

export { usersActions };