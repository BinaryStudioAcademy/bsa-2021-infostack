import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUserActivity } from 'common/interfaces/user';
import { IPagination } from 'common/interfaces/common';
import { ActionType } from './common';

const FILTER_OPTIONS = ['All', 'Me'] as const;
type FilterOption = typeof FILTER_OPTIONS[number];

interface State {
  activities: IUserActivity[];
  filter: FilterOption;
  isLoading: boolean;
  pagination: IPagination;
  totalItems: number;
}

const initialState: State = {
  activities: [],
  filter: FILTER_OPTIONS[0],
  isLoading: false,
  pagination: {
    take: 5,
    skip: 0,
  },
  totalItems: 0,
};

const { reducer, actions } = createSlice({
  name: ReducerName.ACTIVITIES,
  initialState,
  reducers: {
    [ActionType.TOGGLE_IS_LOADING]: (state) => {
      state.isLoading = !state.isLoading;
    },
    [ActionType.SET_ACTIVITIES]: (
      state,
      action: PayloadAction<IUserActivity[]>,
    ) => {
      state.activities = action.payload;
    },
    [ActionType.UPDATE_ACTIVITIES]: (
      state,
      action: PayloadAction<IUserActivity[]>,
    ) => {
      state.activities = [...state.activities, ...action.payload];
    },
    [ActionType.UPDATE_FILTER]: (
      state,
      action: PayloadAction<FilterOption>,
    ) => {
      if (state.filter != action.payload) {
        state.pagination.skip = 0;
      }

      state.filter = action.payload;
    },
    [ActionType.UPDATE_PAGINATION]: (
      state,
      action: PayloadAction<Partial<IPagination>>,
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    [ActionType.UPDATE_TOTAL_ITEMS]: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions, FILTER_OPTIONS };
export type { FilterOption };
