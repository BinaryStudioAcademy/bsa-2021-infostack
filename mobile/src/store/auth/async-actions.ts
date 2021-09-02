import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActionType } from './common';
import { authService } from 'services';
import { ILogin, IUserWithTokens } from 'common/interfaces';
import { LocalStorageVariable } from 'common/enums';

const login = createAsyncThunk(
  ActionType.LOGIN,
  async (loginPayload: ILogin): Promise<IUserWithTokens> => {
    const loginResponse = await authService.loginUser(loginPayload);
    await setTokensLocalStorage(loginResponse);
    return loginResponse;
  },
);

const setTokensLocalStorage = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<void> => {
  await AsyncStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, accessToken);
  await AsyncStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, refreshToken);
};

export { login };
