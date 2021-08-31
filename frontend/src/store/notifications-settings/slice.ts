import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
  isAnyOf,
} from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  disabledNotificationTypes: string[];
  isLoading: boolean;
  isPending: boolean;
};

const initialState: State = {
  disabledNotificationTypes: [],
  isLoading: true,
  isPending: false,
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
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.isPending = true;
      })
      .addMatcher(isAnyOf(isFulfilled, isRejected), (state) => {
        state.isPending = false;
      });
  },
});
