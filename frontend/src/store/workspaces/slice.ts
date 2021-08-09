import { IWorkspace } from 'common/interfaces/workspace';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  workspaces: IWorkspace[] | null;
  currentWorkspace: IWorkspace | null;
  creatingError: string;
};

const initialState: State = {
  workspaces: null,
  currentWorkspace: null,
  creatingError: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.WORKSPACES,
  initialState,
  reducers: {
    [ActionType.SetWorkspaces]: (state, action: PayloadAction<IWorkspace[]>) => {
      state.workspaces = action.payload;
    },
    [ActionType.SetCurrentWorkspace]: (state, action: PayloadAction<IWorkspace>) => {
      state.currentWorkspace = action.payload;
    },
    [ActionType.RemoveCurrentWorkspace]: (state) => {
      state.currentWorkspace = null;
    },
    [ActionType.SetCreatingError]: (state, action: PayloadAction<string>) => {
      state.creatingError = action.payload;
    },
    [ActionType.RemoveCreatingError]: (state) => {
      state.creatingError = '';
    },
  },
});

export { reducer, actions };
