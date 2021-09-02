import { createAsyncThunk } from '@reduxjs/toolkit';
import { IWorkspaceUser } from 'common/interfaces';
import { RootState } from 'common/types/types';
import { ActionType } from './common';
import { workspaceApi } from 'services';
import { RequestStatus, RoleType } from 'common/enums';
import { actions } from './slice';

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

export const chageRole = createAsyncThunk(
  ActionType.CHANGE_ROLE,
  async (
    payload: { userId: string; role: RoleType },
    { dispatch },
  ): Promise<void> => {
    const { userId, role } = payload;

    await workspaceApi.updateUserRoleByWorkspaceId(userId, role);
    dispatch(actions.changeRole({ userId, role }));
  },
);
