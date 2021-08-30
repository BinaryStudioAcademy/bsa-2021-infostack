import { createSlice } from '@reduxjs/toolkit';

import { ReducerName, RequestStatus } from 'common/enums';
import { IWorkspaceUser } from 'common/interfaces';
import { fetchUsers } from './actions';

type State = {
  users: IWorkspaceUser[];
  status: RequestStatus;
};

const initialState: State = {
  users: [],
  status: RequestStatus.IDLE,
};

export const { reducer, actions } = createSlice({
  name: ReducerName.USERS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = RequestStatus.FAILED;
      });
  },
});
