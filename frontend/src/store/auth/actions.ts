import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { AuthApi } from 'services';
import { IUser } from 'common/interfaces/user';

const login = createAsyncThunk(
  ActionType.SetUser,
  async (
    loginPayload: Omit<IUser, 'id' | 'fullName'>,
    { dispatch },
  ): Promise<void> => {
    const loginResponse = await new AuthApi().loginUser(loginPayload);
    dispatch(actions.setUser(loginResponse));
  },
);

const register = createAsyncThunk(
  ActionType.SetUser,
  async (registerPayload: Omit<IUser, 'id'>, { dispatch }): Promise<void> => {
    const registerResponse = await new AuthApi().registerUser(registerPayload);
    dispatch(actions.setUser(registerResponse));
  },
);

const authActions = {
  ...actions,
  login,
  register,
};

export { authActions };
