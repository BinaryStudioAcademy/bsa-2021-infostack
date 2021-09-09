import { IWorkspace } from 'common/interfaces/workspace';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  workspaces: IWorkspace[] | null;
  currentWorkspace: IWorkspace | null;
  isUpdatingCurrentWorkspace: boolean;
  isDeletingCurrentWorkspaceLogo: boolean;
  creatingError: string;
};

const initialState: State = {
  workspaces: null,
  currentWorkspace: null,
  isUpdatingCurrentWorkspace: false,
  isDeletingCurrentWorkspaceLogo: false,
  creatingError: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.WORKSPACES,
  initialState,
  reducers: {
    [ActionType.SET_WORKSPACES]: (
      state,
      action: PayloadAction<IWorkspace[]>,
    ) => {
      state.workspaces = action.payload;
    },
    [ActionType.SET_CURRENT_WORKSPACE]: (
      state,
      action: PayloadAction<IWorkspace>,
    ) => {
      state.currentWorkspace = action.payload;
    },
    [ActionType.REMOVE_CURRENT_WORKSPACE]: (state) => {
      state.currentWorkspace = null;
    },
    [ActionType.SET_CREATING_ERROR]: (state, action: PayloadAction<string>) => {
      state.creatingError = action.payload;
    },
    [ActionType.REMOVE_CREATING_ERROR]: (state) => {
      state.creatingError = '';
    },
    [ActionType.TOGGLE_IS_UPDATING_CURRENT_WORKSPACE]: (state) => {
      state.isUpdatingCurrentWorkspace = !state.isUpdatingCurrentWorkspace;
    },
    [ActionType.TOGGLE_IS_DELETING_CURRENT_WORKSPACE_LOGO]: (state) => {
      state.isDeletingCurrentWorkspaceLogo =
        !state.isDeletingCurrentWorkspaceLogo;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
