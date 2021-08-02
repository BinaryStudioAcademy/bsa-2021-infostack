import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { AuthApi, UserApi } from 'services';
import { IUser } from 'common/interfaces/user';

const login = createAsyncThunk(
  ActionType.SetUser,
  async (
    loginPayload: Omit<IUser, 'id' | 'fullName' | 'avatar'>,
    { dispatch },
  ): Promise<void> => {
    const loginResponse = await new AuthApi().loginUser(loginPayload);
    localStorage.setItem('accessToken', loginResponse.accessToken);
    dispatch(actions.setUser(loginResponse));
  },
);

const register = createAsyncThunk(
  ActionType.SetUser,
  async (
    registerPayload: Omit<IUser, 'id' | 'avatar'>,
    { dispatch },
  ): Promise<void> => {
    const registerResponse = await new AuthApi().registerUser(registerPayload);
    localStorage.setItem('accessToken', registerResponse.accessToken);
    dispatch(actions.setUser(registerResponse));
  },
);

const loadUser = createAsyncThunk(
  ActionType.SetUser,
  async (payload: undefined, { dispatch }): Promise<void> => {
    // TODO change to value from enum
    const token = localStorage.getItem('accessToken');
    // eslint-disable-next-line no-console
    console.log(token);
    if (token) {
      const { userId } = await new UserApi().getCurrentUserId();
      // eslint-disable-next-line no-console
      console.log({ userId });
      const user = await new UserApi().getInfo(userId);
      // eslint-disable-next-line no-console
      console.log(user);
      dispatch(actions.setUser(user));
    }
  },
);

const authActions = {
  ...actions,
  login,
  register,
  loadUser,
};

export { authActions };
