import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';
import { IPageRequest } from 'common/interfaces/pages';

const createPage = createAsyncThunk(
  ActionType.CreatePage,
  async (createPayload: IPageRequest, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const createPageResponse = await new PageApi().createPage(createPayload);
    dispatch(actions.createPage(createPageResponse));
    dispatch(actions.toggleSpinner());
  },
);

const createVersionPage = createAsyncThunk(
  ActionType.CreateVersionPage,
  async (createVersionPayload: IPageRequest, { dispatch }) => {
    const createVersionPageResponse = await new PageApi().createVersionPage(createVersionPayload);
    dispatch(actions.createVersionPage(createVersionPageResponse));
  },
);

const getPagesAsync = createAsyncThunk(
  ActionType.SetPages,
  async (payload: undefined, { dispatch }) => {
    const response = await new PageApi().getPages();
    dispatch(actions.setPages(response));
  },
);

const getPage = createAsyncThunk(
  ActionType.GetPage,
  async (getPayload: string | undefined, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const createPageResponse = await new PageApi().getPage(getPayload);
    dispatch(actions.getPage(createPageResponse));
    dispatch(actions.toggleSpinner());
  },
);

const pagesActions = {
  ...actions,
  createPage,
  createVersionPage,
  getPagesAsync,
  getPage,
};

export {
  pagesActions,
};
