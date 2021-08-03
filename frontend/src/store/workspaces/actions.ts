import { IWorkspaceCreation } from 'common/interfaces/workspace';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { WorkspaceApi } from 'services';

const loadWorkspaces = createAsyncThunk(
  ActionType.SetWorkspaces,
  async (payload: undefined, { dispatch }) => {
    try {
      const getResponse = await new WorkspaceApi().get();
      dispatch(actions.SetWorkspaces(getResponse));
    } catch (err) {
      alert(err);
    }
  },
);

const createWorkspace = createAsyncThunk(
  ActionType.SetCurrentWorkspaceID,
  async (payload: IWorkspaceCreation, { dispatch }) => {
    try {
      const { id } = await new WorkspaceApi().create(payload);
      dispatch(actions.SetCurrentWorkspaceID(id));
    } catch (err) {
      alert(err);
    }
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
