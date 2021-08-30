import { createAsyncThunk } from '@reduxjs/toolkit';
import { IWorkspaceUser } from 'common/interfaces';
import { RootState } from 'common/types/types';
import { ActionType } from './common';
import { workspaceApi } from 'services';
import { RequestStatus } from 'common/enums';

export const fetchUsers = createAsyncThunk<
  IWorkspaceUser[],
  void,
  { state: RootState }
>(ActionType.FETCH_USERS, () => workspaceApi.getUsers(), {
  condition: (_, { getState }) => {
    const {
      users: { status },
    } = getState();

    if (status === RequestStatus.LOADING) {
      return false;
    }
  },
});
