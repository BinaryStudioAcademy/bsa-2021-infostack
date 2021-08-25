import { IWorkspaceCreation } from 'common/interfaces/workspace';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { workspaceApi } from 'services';
import { HttpCode } from 'common/enums/enums';

const loadWorkspaces = createAsyncThunk(
  ActionType.SET_WORKSPACES,
  async (payload: undefined, { dispatch }) => {
    const getResponse = await workspaceApi.getWorkspaces();
    dispatch(actions.setWorkspaces(getResponse));
  },
);

const createWorkspace = createAsyncThunk(
  ActionType.SET_CURRENT_WORKSPACE,
  async (payload: IWorkspaceCreation, { dispatch }) => {
    try {
      const workspace = await workspaceApi.create(payload);
      dispatch(actions.setCurrentWorkspace(workspace));
      dispatch(actions.removeCreatingError());
    } catch (err) {
      if (err.status === HttpCode.CONFLICT) {
        dispatch(actions.setCreatingError(err.message));
      }
    }
  },
);

const loadWorkspace = createAsyncThunk(
  ActionType.SET_CURRENT_WORKSPACE,
  async (id: string, { dispatch }) => {
    const workspace = await workspaceApi.getWorkspace(id);
    dispatch(actions.setCurrentWorkspace(workspace));
  },
);

const workspacesActions = {
  ...actions,
  loadWorkspaces,
  loadWorkspace,
  createWorkspace,
};

export { workspacesActions };
