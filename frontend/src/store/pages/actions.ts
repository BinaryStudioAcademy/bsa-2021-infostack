import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';
import { IPageRequest } from 'common/interfaces/pages';
import { Http } from '../../services/http/http.service';

const http = new Http();

const createPage = createAsyncThunk(
  ActionType.CREATE_PAGE,
  async (createPayload: IPageRequest, { dispatch }) => {
    const createPageResponse = await new PageApi({ http }).createPage(createPayload);
    dispatch(actions.createPage(createPageResponse));
  },
);

const createVersionPage = createAsyncThunk(
  ActionType.CREATE_VERSION_PAGE,
  async (createVersionPayload: IPageRequest, { dispatch }) => {
    const createVersionPageResponse = await new PageApi({ http }).createVersionPage(createVersionPayload);
    dispatch(actions.createVersionPage(createVersionPageResponse));
  },
);

const getPages = createAsyncThunk(
  ActionType.GET_PAGES,
  async (getPayload: Record<string, never>, { dispatch }) => {
    const getPagesResponse = await new PageApi({ http }).getPages();
    dispatch(actions.getPages(getPagesResponse));
  },
);

const getPage = createAsyncThunk(
  ActionType.GET_PAGE,
  async (getPayload: string, { dispatch }) => {
    const createPageResponse = await new PageApi({ http }).getPage(getPayload);
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
