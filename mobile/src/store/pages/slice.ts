import { createSlice } from '@reduxjs/toolkit';

import { ReducerName } from 'common/enums';
import { IPage, IPageNav } from 'common/interfaces';
import { RequestStatus } from 'common/enums';
import { fetchPages, fetchCurrentPage } from './async-actions';

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
      })
      .addCase(fetchCurrentPage.pending, (state) => {
        state.currentPageStatus = RequestStatus.LOADING;
      })
      .addCase(fetchCurrentPage.fulfilled, (state, action) => {
        state.currentPage = action.payload;
        state.currentPageStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(fetchCurrentPage.rejected, (state) => {
        state.currentPageStatus = RequestStatus.FAILED;
      });
  },
});
