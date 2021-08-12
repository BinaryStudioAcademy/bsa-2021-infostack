import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPageNav, IPage } from 'common/interfaces/pages';
import { ActionType } from './common';

type State = {
  pages: IPageNav[] | null;
  currentPage: IPage | null;
  isSpinner: boolean;
  isCurrentPageFollowed: boolean;
};

const initialState: State = {
  pages: null,
  currentPage: null,
  isSpinner: false,
  isCurrentPageFollowed: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PAGE,
  initialState,
  reducers: {
    [ActionType.CREATE_PAGE]: (state, action: PayloadAction<IPage>) => {
      state.currentPage = action.payload;
    },
    [ActionType.CREATE_VERSION_PAGE]: (
      state,
      action: PayloadAction<IPageNav>,
    ) => {
      if (state.pages === null) {
        state.pages = [action.payload];
      } else {
        state.pages.push(action.payload);
      }
    },
    [ActionType.SET_PAGES]: (state, action: PayloadAction<IPageNav[]>) => {
      state.pages = action.payload;
    },
    [ActionType.GET_PAGE]: (state, action: PayloadAction<IPage>) => {
      state.currentPage = action.payload;
      state.isCurrentPageFollowed = false;
    },
    [ActionType.TOGGLE_SPINNER]: (state) => {
      state.isSpinner = !state.isSpinner;
    },
    [ActionType.CLEAR_CURRENT_PAGE]: (state) => {
      state.currentPage = null;
      state.isCurrentPageFollowed = false;
    },
  },
  extraReducers: {
    [ActionType.SET_CURRENT_PAGE_FOLLOWED]: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isCurrentPageFollowed = action.payload;
    },
  },
});

export { reducer, actions };
