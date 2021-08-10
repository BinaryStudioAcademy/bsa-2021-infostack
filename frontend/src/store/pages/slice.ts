import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPage, IPageNav } from 'common/interfaces/pages';
import { ActionType } from './common';

type State = {
  pages: IPageNav[] | null;
  currentPage: IPage | null;
  isSpinner: boolean;
};

const initialState: State = {
  pages: null,
  currentPage: null,
  isSpinner : false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PAGE,
  initialState,
  reducers: {
    [ActionType.CreatePage]: (state, action: PayloadAction<IPage>) => {
      state.currentPage = action.payload;
    },
    [ActionType.CreateVersionPage]: (state, action: PayloadAction<IPageNav>) => {
      if(state.pages === null) {
        state.pages = [action.payload];
      }else{
        state.pages.push(action.payload);
      }
    },
    [ActionType.SetPages]: (state, action: PayloadAction<IPageNav[]>) => {
      state.pages = action.payload;
    },
    [ActionType.GetPage]: (state, action: PayloadAction<IPage>) => {
      state.currentPage = action.payload;
    },
    [ActionType.ToggleSpinner]: (state) => {
      state.isSpinner = !state.isSpinner;
    },
  },
});

export { reducer, actions };
