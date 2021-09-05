import { createSlice } from '@reduxjs/toolkit';
import { ActionType } from './common';
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
  reducers: {
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
    [ActionType.CHANGE_ROLE]: (state, action) => {
      const { userId, role } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);

      state.users[userIndex].role = role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = RequestStatus.SUCCEEDED;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = RequestStatus.FAILED;
      });
  },
});
