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
    [ActionType.SetUser]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    [ActionType.RemoveUser]: (state) => {
      state.user = null;
    },
    [ActionType.ToggleIsRefreshTokenExpired]: (state) => {
      state.isRefreshTokenExpired = !state.isRefreshTokenExpired;
    },
  },
});

export { reducer, actions };
