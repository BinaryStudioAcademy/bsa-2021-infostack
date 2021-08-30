import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPageNav, IPage } from 'common/interfaces/pages';
import { IUser } from 'common/interfaces/user';
import { ActionType } from './common';

type State = {
  pages: IPageNav[] | null;
  pinnedPages: IPageNav[] | null;
  currentPage: IPage | null;
  isSpinner: boolean;
  isCurrentPageFollowed: boolean;
  isCurrentPagePinned: boolean;
  isCurrentPageEdited: boolean;
  editors: IUser[];
};

const initialState: State = {
  pages: null,
  pinnedPages: null,
  currentPage: null,
  isSpinner: false,
  isCurrentPageFollowed: false,
  isCurrentPagePinned: false,
  editors: [],
  isCurrentPageEdited: false,
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
    [ActionType.TOGGLE_SPINNER]: (state) => {
      state.isSpinner = !state.isSpinner;
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
    [ActionType.ADD_EDITOR]: (
      state,
      action: PayloadAction<IUser>,
      // action: PayloadAction<boolean>,
    ) => {
      console.info('therer');
      state.editors.push(action.payload);
      // state.isCurrentPageEdited = action.payload;
    },
    [ActionType.DELETE_EDITOR]: (state, action: PayloadAction<IUser>) => {
      const id = action.payload.id;
      state.editors = state.editors.filter((editor) => editor.id !== id);
    },
  },
});

export { reducer, actions };
