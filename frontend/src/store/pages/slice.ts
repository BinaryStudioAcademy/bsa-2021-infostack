import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPageNav, IPage } from 'common/interfaces/pages';
import { ActionType } from './common';

type State = {
  pages: IPageNav[] | null;
  pinnedPages: IPageNav[] | null;
  currentPage: IPage | null;
  isSpinner: boolean;
  isCurrentPageFollowed: boolean;
  isCurrentPagePinned: boolean;
};

const initialState: State = {
  pages: null,
  pinnedPages: null,
  currentPage: null,
  isSpinner: false,
  isCurrentPageFollowed: false,
  isCurrentPagePinned: false,
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
    [ActionType.SET_PINNED_PAGES]: (
      state,
      action: PayloadAction<IPageNav[]>,
    ) => {
      state.pinnedPages = action.payload;
    },
    [ActionType.DELETE_PAGE]: (state) => {
      state.currentPage = null;
    },
    [ActionType.GET_PAGE]: (state, action: PayloadAction<IPage>) => {
      state.currentPage = action.payload;
      state.isCurrentPageFollowed = false;
      state.isCurrentPagePinned = false;
    },
    [ActionType.SPINNER_ON]: (state) => {
      state.isSpinner = true;
    },
    [ActionType.SPINNER_OFF]: (state) => {
      state.isSpinner = false;
    },
    [ActionType.CLEAR_CURRENT_PAGE]: (state) => {
      state.currentPage = null;
      state.isCurrentPageFollowed = false;
      state.isCurrentPagePinned = false;
    },
    [ActionType.SET_CURRENT_PAGE_FOLLOWED]: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isCurrentPageFollowed = action.payload;
    },
    [ActionType.SET_CURRENT_PAGE_PINNED]: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isCurrentPagePinned = action.payload;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
