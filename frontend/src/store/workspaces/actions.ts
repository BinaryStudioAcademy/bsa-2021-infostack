import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { WorkspaceApi } from 'services';

const loadWorkspaces = createAsyncThunk(
  ActionType.SetWorkspaces,
  // eslint-disable-next-line
  async (payload: undefined, { dispatch }) => {
    const getResponse = await new WorkspaceApi().get();
    dispatch(actions.SetWorkspaces(getResponse));
  },
);

const workspacesActions = {
  ...actions,
  loadWorkspaces,
};

export {
  workspacesActions,
};
