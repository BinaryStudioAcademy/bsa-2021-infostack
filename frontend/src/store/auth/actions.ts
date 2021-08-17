import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { AuthApi, UserApi } from 'services';
import { ILogin, IRegister } from 'common/interfaces/auth';
import { LocalStorageVariable } from 'common/enums/enums';

const login = createAsyncThunk(
  ActionType.SET_USER,
  async (loginPayload: ILogin, { dispatch }): Promise<void> => {
    const loginResponse = await new AuthApi().loginUser(loginPayload);
    setTokensLocalStorage(loginResponse);
    dispatch(actions.setUser(loginResponse));
  },
);

const register = createAsyncThunk(
  ActionType.SET_USER,
  async (registerPayload: IRegister, { dispatch }): Promise<void> => {
    const registerResponse = await new AuthApi().registerUser(registerPayload);
    setTokensLocalStorage(registerResponse);
    dispatch(actions.setUser(registerResponse));
  },
);

const logout = createAsyncThunk(
  ActionType.REMOVE_USER,
  async (payload: undefined, { dispatch }): Promise<void> => {
    const refreshToken = localStorage.getItem(
      LocalStorageVariable.REFRESH_TOKEN,
    );
    localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
    dispatch(actions.removeUser());
    if (refreshToken) await new AuthApi().logout({ refreshToken });
  },
);

const loadUser = createAsyncThunk(
  ActionType.SET_USER,
  async (payload: undefined, { dispatch }): Promise<void> => {
    const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
    if (token) {
      const user = await new UserApi().getCurrentUserInfo();
      dispatch(actions.setUser(user));
    }
  },
);

const loginGoogle = createAsyncThunk(
  ActionType.SET_USER,
  async (code: string, { dispatch }): Promise<void> => {
    const loginResponse = await new AuthApi().loginGoogle(code);
    setTokensLocalStorage(loginResponse);
    dispatch(actions.setUser(loginResponse));
  },
);

const setTokensLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void => {
  localStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, refreshToken);
};

const authActions = {
  ...actions,
  login,
  register,
  logout,
  loadUser,
  loginGoogle,
};

export { authActions };
