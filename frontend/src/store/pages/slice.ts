import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';
import { IPage } from 'common/interfaces/page';

type State = {
  pages: IPage[] | null;
  currentPage: IPage | null,

};

const initialState: State = {
  pages: null,
  currentPage: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PAGES,
  initialState,
  reducers: {
    [ActionType.setPages]: (state, action: PayloadAction<IPage[]>) => {
      state.pages = action.payload;
    },
  },
});

export { reducer, actions };
