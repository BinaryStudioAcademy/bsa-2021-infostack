import { RootState } from 'common/types';

export const selectPages = (state: RootState) => state.pages.pages;
export const selectPagesState = (state: RootState) => state.pages;
