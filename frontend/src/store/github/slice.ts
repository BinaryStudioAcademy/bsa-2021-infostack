import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  username: string | undefined;
  repos: string[] | null;
  currentRepo: string | undefined;
};

const initialState: State = {
  username: undefined,
  repos: null,
  currentRepo: undefined,
};

export const { reducer, actions } = createSlice({
  name: ReducerName.NOTIFICATIONS,
  initialState,
  reducers: {
    [ActionType.SET_USERNAME]: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    [ActionType.SET_REPOS]: (state, action: PayloadAction<string[]>) => {
      state.repos = action.payload;
    },
    [ActionType.REMOVE_REPOS]: (state) => {
      state.repos = null;
    },
    [ActionType.SET_CURRENT_REPO]: (state, action: PayloadAction<string>) => {
      state.currentRepo = action.payload;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});
