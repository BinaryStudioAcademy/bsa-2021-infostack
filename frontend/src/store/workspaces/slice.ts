import { IWorkspace } from 'common/interfaces/workspace';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  workspaces: IWorkspace[] | null;
  currentWorkspaceID: string;
};

const initialState: State = {
  workspaces: null,
  currentWorkspaceID: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.WORKSPACES,
  initialState,
  reducers: {
    [ActionType.SetWorkspaces]: (state, action: PayloadAction<IWorkspace[]>) => {
      state.workspaces = action.payload;
    },
    [ActionType.SetCurrentWorkspaceID]: (state, action: PayloadAction<string>) => {
      state.currentWorkspaceID = action.payload;
    },
  },
});

export { reducer, actions };
