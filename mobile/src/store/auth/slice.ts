import { createSlice } from '@reduxjs/toolkit';

import { ReducerName, RequestStatus } from 'common/enums';
import { IUser } from 'common/interfaces';
import { login } from './async-actions';

type State = {
  user: IUser | null;
  signInStatus: RequestStatus;
  signInError?: string;
};

const initialState: State = {
  user: null,
  signInStatus: RequestStatus.IDLE,
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.signInStatus = RequestStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.signInStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(login.rejected, (state, action) => {
        state.signInStatus = RequestStatus.FAILED;
        state.signInError = action.error.message;
      });
  },
});

export { reducer, actions };
