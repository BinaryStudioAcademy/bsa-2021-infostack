import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import { ActionType } from './common';

type State = {
  users: IWorkspaceUser[];
};

const initialState: State = {
  users: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.USERS,
  initialState,
  reducers: {
    [ActionType.SET_USERS]: (
      state,
      action: PayloadAction<IWorkspaceUser[]>,
    ) => {
      state.users = action.payload;
    },
  },
});

export { reducer, actions };
