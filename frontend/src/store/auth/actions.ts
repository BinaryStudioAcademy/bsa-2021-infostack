import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { AuthApi, UserApi } from 'services';
import { IUser } from 'common/interfaces/user';
import { LocalStorageVariable } from 'common/enums/enums';

const login = createAsyncThunk(
  ActionType.SetUser,
  async (
    loginPayload: Omit<IUser, 'id' | 'fullName' | 'avatar'>,
    { dispatch },
  ): Promise<void> => {
    const loginResponse = await new AuthApi().loginUser(loginPayload);
    localStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, loginResponse.accessToken);
    localStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, loginResponse.refreshToken);
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
    localStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, registerResponse.accessToken);
    localStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, registerResponse.refreshToken);
    dispatch(actions.setUser(registerResponse));
  },
);

const logout = createAsyncThunk(
  ActionType.RemoveUser,
  async (payload: undefined, { dispatch }): Promise<void> => {
    const refreshToken = localStorage.getItem(LocalStorageVariable.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
    dispatch(actions.removeUser());
    if (refreshToken) await new AuthApi().logout({ refreshToken });
  },
);

const loadUser = createAsyncThunk(
  ActionType.SetUser,
  async (payload: undefined, { dispatch }): Promise<void> => {
    const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
    if (token) {
      const user = await new UserApi().getCurrentUserInfo();
      dispatch(actions.setUser(user));
    }
  },
);

const authActions = {
  ...actions,
  login,
  register,
  logout,
  loadUser,
};

export { authActions };
