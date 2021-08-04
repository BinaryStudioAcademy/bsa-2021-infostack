import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { WorkspaceApi } from 'services';

const loadUsers = createAsyncThunk(
  ActionType.SetUsers,
  async (_, { dispatch }): Promise<void> => {
    const response = await new WorkspaceApi().loadUsers();
    dispatch(actions.setUsers(response));
  },
);

const loadTeams = createAsyncThunk(
  ActionType.SetTeams,
  async (_, { dispatch }): Promise<void> => {
    const response = await new WorkspaceApi().loadTeams();
    dispatch(actions.SetTeams(response));
  },
);

const workspaceActions = {
  ...actions,
  loadUsers,
  loadTeams,
};

export { workspaceActions };
