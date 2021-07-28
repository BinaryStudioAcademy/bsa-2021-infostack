import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPage } from 'common/interfaces/pages';
import { ActionType } from './common';

type State = {
  pages: IPage[] | null;
  currentPage: IPage | null;
};

const initialState: State = {
  pages: null,
  currentPage: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PAGE,
  initialState,
  reducers: {
    [ActionType.CREATE_PAGE]: (state, action: PayloadAction<IPage>) => {
      if(state.pages === null) {
        state.pages = [action.payload];
      }else{
        state.pages.push(action.payload);
      }
    },
    [ActionType.CREATE_VERSION_PAGE]: (state, action: PayloadAction<IPage>) => {
      if(state.pages === null) {
        state.pages = [action.payload];
      }else{
        state.pages.push(action.payload);
      }
    },
    [ActionType.GET_PAGES]: (state, action: PayloadAction<IPage[]>) => {
      state.pages = action.payload;
    },
    [ActionType.GET_PAGE]: (state, action: PayloadAction<IPage>) => {
      state.currentPage = action.payload;
    },
  },
});

export { reducer, actions };