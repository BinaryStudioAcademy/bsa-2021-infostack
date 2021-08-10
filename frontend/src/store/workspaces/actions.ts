import { IWorkspaceCreation } from 'common/interfaces/workspace';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { WorkspaceApi } from 'services';
import { HttpCode } from 'common/enums/enums';

const loadWorkspaces = createAsyncThunk(
  ActionType.SetWorkspaces,
  async (payload: undefined, { dispatch }) => {
    const getResponse = await new WorkspaceApi().get();
    dispatch(actions.SetWorkspaces(getResponse));
  },
);

const createWorkspace = createAsyncThunk(
  ActionType.SetCurrentWorkspace,
  async (payload: IWorkspaceCreation, { dispatch }) => {
    try {
      const workspace = await new WorkspaceApi().create(payload);
      dispatch(actions.SetCurrentWorkspace(workspace));
      dispatch(actions.RemoveCreatingError());
    } catch (err) {
      if (err.status === HttpCode.CONFLICT) {
        dispatch(actions.SetCreatingError(err.message));
      }
    }
  },
);

const loadWorkspace = createAsyncThunk(
  ActionType.SetCurrentWorkspace,
  async (id: string, { dispatch }) => {
    const workspace = await new WorkspaceApi().getById(id);
    dispatch(actions.SetCurrentWorkspace(workspace));
  },
);

const workspacesActions = {
  ...actions,
  loadWorkspaces,
  loadWorkspace,
  createWorkspace,
};

export {
  workspacesActions,
};
