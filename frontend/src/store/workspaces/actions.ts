import { IWorkspaceCreation } from 'common/interfaces/workspace';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { WorkspaceApi } from 'services';

const loadWorkspaces = createAsyncThunk(
  ActionType.SetWorkspaces,
  async (payload: undefined, { dispatch }) => {
    const getResponse = await new WorkspaceApi().get();
    dispatch(actions.SetWorkspaces(getResponse));
  },
);

const createWorkspace = createAsyncThunk(
  ActionType.SetCurrentWorkspaceID,
  async (payload: IWorkspaceCreation, { dispatch }) => {
    const { id } = await new WorkspaceApi().create(payload);
    dispatch(actions.SetCurrentWorkspaceID(id));
  },
);

const workspacesActions = {
  ...actions,
  loadWorkspaces,
  createWorkspace,
};

export {
  workspacesActions,
};
