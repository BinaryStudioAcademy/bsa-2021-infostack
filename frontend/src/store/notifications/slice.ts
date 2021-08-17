import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { INotification } from 'common/interfaces/notification';
import { ActionType } from './common';

type State = {
  notifications: INotification[];
  count: number;
  isExpanded: boolean;
};

const initialState: State = {
  notifications: [],
  count: 0,
  isExpanded: false,
};

export const { reducer, actions } = createSlice({
  name: ReducerName.NOTIFICATIONS,
  initialState,
  reducers: {
    [ActionType.SET_NOTIFICATIONS]: (
      state,
      action: PayloadAction<INotification[]>,
    ) => {
      state.notifications = action.payload;
    },
    [ActionType.REMOVE_NOTIFICATIONS]: (state) => {
      state.notifications = [];
    },
    [ActionType.SET_COUNT]: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    [ActionType.INCREMENT_COUNT]: (state) => {
      state.count += 1;
    },
    [ActionType.TOGGLE_IS_EXPANDED]: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    [ActionType.SET_IS_EXPANDED]: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload;
    },
  },
});
