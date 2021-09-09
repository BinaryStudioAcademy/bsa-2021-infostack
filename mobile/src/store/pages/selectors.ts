import { RootState } from 'common/types';

export const selectPages = (state: RootState) => state.pages.pages;
export const selectCurrentPage = (state: RootState) => state.pages.currentPage;
export const selectCurrentPageStatus = (state: RootState) =>
  state.pages.currentPageStatus;
export const selectPagesState = (state: RootState) => state.pages;
