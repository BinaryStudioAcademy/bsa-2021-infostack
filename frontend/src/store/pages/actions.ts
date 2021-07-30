import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';
import { IPageRequest } from 'common/interfaces/pages';

const createPage = createAsyncThunk(
  ActionType.CREATE_PAGE,
  async (createPayload: IPageRequest, { dispatch }) => {
    const createPageResponse = await new PageApi().createPage(createPayload);
    dispatch(actions.createPage(createPageResponse));
  },
);

const createVersionPage = createAsyncThunk(
  ActionType.CREATE_VERSION_PAGE,
  async (createVersionPayload: IPageRequest, { dispatch }) => {
    const createVersionPageResponse = await new PageApi().createVersionPage(createVersionPayload);
    dispatch(actions.createVersionPage(createVersionPageResponse));
  },
);

const getPages = createAsyncThunk(
  ActionType.GET_PAGES,
  async (getPayload: undefined, { dispatch }) => {
    const getPagesResponse = await new PageApi().getPages();
    dispatch(actions.getPages(getPagesResponse));
  },
);

const getPage = createAsyncThunk(
  ActionType.GET_PAGE,
  async (getPayload: string, { dispatch }) => {
    const createPageResponse = await new PageApi().getPage(getPayload);
    dispatch(actions.getPage(createPageResponse));
  },
);

const pageActions = {
  ...actions,
  createPage,
  createVersionPage,
  getPages,
  getPage,
};

export {
  pageActions,
};
