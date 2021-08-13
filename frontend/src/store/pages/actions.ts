import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';
import {
  IPageNav,
  IPageRequest,
  IEditPageContent,
} from 'common/interfaces/pages';
import { RootState } from 'common/types/types';

interface PageAction {
  type: string;
  payload: boolean;
}

const createPage = createAsyncThunk(
  ActionType.CREATE_PAGE,
  async (createPayload: IPageRequest, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const createPageResponse = await new PageApi().createPage(createPayload);
    dispatch(actions.createPage(createPageResponse));
    dispatch(actions.toggleSpinner());
    return createPageResponse;
  },
);

const createVersionPage = createAsyncThunk(
  ActionType.CREATE_VERSION_PAGE,
  async (createVersionPayload: IPageRequest, { dispatch }) => {
    const createVersionPageResponse = await new PageApi().createVersionPage(
      createVersionPayload,
    );
    dispatch(actions.createVersionPage(createVersionPageResponse));
  },
);

const getPagesAsync = createAsyncThunk(
  ActionType.SET_PAGES,
  async (payload: undefined, { dispatch }) => {
    const response = await new PageApi().getPages();
    dispatch(actions.setPages(response));
  },
);

const getPage = createAsyncThunk(
  ActionType.GET_PAGE,
  async (getPayload: string | undefined, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const createPageResponse = await new PageApi().getPage(getPayload);
    dispatch(actions.getPage(createPageResponse));
    dispatch(actions.toggleSpinner());
  },
);

const setPage = createAsyncThunk(
  ActionType.GET_PAGE,
  async (getPayload: string | undefined, { dispatch }) => {
    const pageResponse = await new PageApi().getPage(getPayload);
    dispatch(actions.getPage(pageResponse));
  },
);

type FollowPayload = {
  pageId: string;
  withChildren: boolean;
};

const getPagesIds = ({ id, childPages }: IPageNav): string[] =>
  childPages ? [id, ...childPages.flatMap(getPagesIds)] : [id];

const followPage = createAsyncThunk<
  Promise<void>,
  FollowPayload,
  { state: RootState }
>(
  ActionType.GET_PAGE,
  async ({ pageId, withChildren }, { dispatch, getState }) => {
    const pageApi = new PageApi();

    if (withChildren) {
      const pages = getState().pages.pages as IPageNav[];
      const currentPage = pages.find(({ id }) => id === pageId) as IPageNav;
      const ids = getPagesIds(currentPage);
      await pageApi.followPages(ids);
    } else {
      await pageApi.followPage(pageId);
    }

    const response = await pageApi.getPage(pageId);
    dispatch(actions.getPage(response));
  },
);

const unfollowPage = createAsyncThunk<
  Promise<void>,
  FollowPayload,
  { state: RootState }
>(
  ActionType.GET_PAGE,
  async ({ pageId, withChildren }, { dispatch, getState }) => {
    const pageApi = new PageApi();

    if (withChildren) {
      const pages = getState().pages.pages as IPageNav[];
      const currentPage = pages.find(({ id }) => id === pageId) as IPageNav;
      const ids = getPagesIds(currentPage);
      await pageApi.unfollowPages(ids);
    } else {
      await pageApi.unfollowPage(pageId);
    }

    const response = await pageApi.getPage(pageId);
    dispatch(actions.getPage(response));
  },
);

const setCurrentPageFollowed = (payload: boolean): PageAction => ({
  type: ActionType.SET_CURRENT_PAGE_FOLLOWED,
  payload,
});

const editPageContent = createAsyncThunk(
  ActionType.EDIT_PAGE_CONTENT,
  async (getPayload: IEditPageContent, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const editContentResponse = await new PageApi().editPageContent(getPayload);
    dispatch(actions.getPage(editContentResponse));
    dispatch(actions.toggleSpinner());

    const response = await new PageApi().getPages();
    dispatch(actions.setPages(response));
  },
);

const pagesActions = {
  ...actions,
  createPage,
  createVersionPage,
  getPagesAsync,
  getPage,
  setPage,
  setCurrentPageFollowed,
  editPageContent,
  followPage,
  unfollowPage,
};

export { pagesActions };
