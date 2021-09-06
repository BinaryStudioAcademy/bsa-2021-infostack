import {
  IWorkspaceCreation,
  IWorkspaceUpdate,
} from 'common/interfaces/workspace';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { workspaceApi } from 'services';
import { HttpCode } from 'common/enums';
import { RootState } from 'common/types/types';

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

const updateWorkspace = createAsyncThunk(
  ActionType.UPDATE_CURRENT_WORKSPACE,
  async (payload: IWorkspaceUpdate & { id: string }, { dispatch }) => {
    const { id, ...data } = payload;
    dispatch(actions.toggleIsUpdatingCurrentWorkspace());

    await workspaceApi.updateWorkspaceById(id, data);
    const workspace = await workspaceApi.getWorkspace(id);

    dispatch(actions.setCurrentWorkspace(workspace));

    dispatch(actions.toggleIsUpdatingCurrentWorkspace());
  },
);

const deleteWorkspaceLogo = createAsyncThunk(
  ActionType.DELETE_CURRENT_WORKSPACE_LOGO,
  async (id: string, { dispatch, getState }) => {
    dispatch(actions.toggleIsDeletingCurrentWorkspaceLogo());

    await workspaceApi.deleteLogo(id);
    const {
      workspaces: { currentWorkspace },
    } = getState() as RootState;

    if (currentWorkspace) {
      dispatch(actions.setCurrentWorkspace({ ...currentWorkspace, logo: '' }));
    }

    dispatch(actions.toggleIsDeletingCurrentWorkspaceLogo());
  },
);

const workspacesActions = {
  ...actions,
  loadWorkspaces,
  loadWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspaceLogo,
};

export { workspacesActions };
