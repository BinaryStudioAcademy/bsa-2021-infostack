import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import { ActionType } from './common';

type State = {
  user: IUser | null;
  isRefreshTokenExpired: boolean;
};

const initialState: State = {
  user: null,
  isRefreshTokenExpired: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {
    [ActionType.SET_USER]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    [ActionType.UPDATE_USER]: (
      state,
      action: PayloadAction<Partial<IUser>>,
    ) => {
      Object.assign(state.user, action.payload);
    },
    [ActionType.REMOVE_USER]: (state) => {
      state.user = null;
    },
    [ActionType.TOGGLE_REFRESH_TOKEN_EXPIRED]: (state) => {
      state.isRefreshTokenExpired = !state.isRefreshTokenExpired;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
