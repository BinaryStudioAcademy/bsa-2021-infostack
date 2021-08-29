import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from 'src/common/enums';
import { IPage, IPageNav } from 'src/common/interfaces';
import { RequestStatus } from 'src/common/enums';
import { fetchPages } from './async-actions';

type State = {
  currentPage: IPage | null;
  currentPageStatus: RequestStatus;
  pages: IPageNav[];
  pagesStatus: RequestStatus;
};

const initialState: State = {
  currentPage: null,
  currentPageStatus: RequestStatus.IDLE,
  pages: [],
  pagesStatus: RequestStatus.IDLE,
};

export const { reducer, actions } = createSlice({
  name: ReducerName.PAGES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.pagesStatus = RequestStatus.LOADING;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.pages = action.payload;
        state.pagesStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(fetchPages.rejected, (state) => {
        state.pagesStatus = RequestStatus.FAILED;
      });
  },
});
