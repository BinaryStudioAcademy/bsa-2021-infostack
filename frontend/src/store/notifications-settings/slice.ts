import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  disabledNotificationTypes: string[];
  isLoading: boolean;
};

const initialState: State = {
  disabledNotificationTypes: [],
  isLoading: true,
};

export const { reducer, actions } = createSlice({
  name: ReducerName.NOTIFICATIONS_SETTINGS,
  initialState,
  reducers: {
    [ActionType.SET_NOTIFICATIONS_SETTINGS]: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.disabledNotificationTypes = action.payload;
      state.isLoading = false;
    },
    [ActionType.CREATE_NOTIFICATION_SETTING]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.disabledNotificationTypes.push(action.payload);
    },
    [ActionType.DELETE_NOTIFICATION_SETTING]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.disabledNotificationTypes = state.disabledNotificationTypes.filter(
        (item) => item !== action.payload,
      );
    },
  },
});
