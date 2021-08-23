import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';
import {
  IPageNav,
  IPageRequest,
  IEditPageContent,
} from 'common/interfaces/pages';
import { RootState } from 'common/types/types';

const createPage = createAsyncThunk(
  ActionType.CREATE_PAGE,
  async (createPayload: IPageRequest, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    try {
      const createPageResponse = await new PageApi().createPage(createPayload);
      dispatch(actions.createPage(createPageResponse));
      return createPageResponse;
    } catch (e) {
      toast.error(e.message);
    } finally {
      dispatch(actions.toggleSpinner());
    }
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
    const getPageResponse = await new PageApi().getPage(getPayload);
    dispatch(actions.getPage(getPageResponse));
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

const deletePage = createAsyncThunk(
  ActionType.DELETE_PAGE,
  async (pageId: string, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    await new PageApi().deletePage(pageId);
    dispatch(actions.deletePage());
    dispatch(getPagesAsync());
    dispatch(actions.toggleSpinner());
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
    if (withChildren) {
      const pages = getState().pages.pages as IPageNav[];
      const currentPage = pages.find(({ id }) => id === pageId) as IPageNav;
      const ids = getPagesIds(currentPage);
      await new PageApi().followPages(ids);
    } else {
      await new PageApi().followPage(pageId);
    }

    const response = await new PageApi().getPage(pageId);
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
    if (withChildren) {
      const pages = getState().pages.pages as IPageNav[];
      const currentPage = pages.find(({ id }) => id === pageId) as IPageNav;
      const ids = getPagesIds(currentPage);
      await new PageApi().unfollowPages(ids);
    } else {
      await new PageApi().unfollowPage(pageId);
    }

    const response = await new PageApi().getPage(pageId);
    dispatch(actions.getPage(response));
  },
);

const editPageContent = createAsyncThunk(
  ActionType.EDIT_PAGE_CONTENT,
  async (getPayload: IEditPageContent, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const editContentResponse = await new PageApi().editPageContent(getPayload);
    dispatch(actions.getPage(editContentResponse));

    const response = await new PageApi().getPages();
    dispatch(actions.setPages(response));
    dispatch(actions.toggleSpinner());
  },
);

const editDraft = createAsyncThunk(
  ActionType.EDIT_DRAFT,
  async (getPayload: IEditPageContent, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    const editDraftResponse = await new PageApi().editDraft(getPayload);
    dispatch(actions.getPage(editDraftResponse));

    const response = await new PageApi().getPages();
    dispatch(actions.setPages(response));
    dispatch(actions.toggleSpinner());
  },
);

const deleteDraft = createAsyncThunk(
  ActionType.DELETE_DRAFT,
  async (pageId: string, { dispatch }) => {
    dispatch(actions.toggleSpinner());
    await new PageApi().deleteDraft(pageId);
    const response = await new PageApi().getPage(pageId);
    dispatch(actions.getPage(response));
    dispatch(actions.toggleSpinner());
  },
);

const pagesActions = {
  ...actions,
  createPage,
  deletePage,
  createVersionPage,
  getPagesAsync,
  getPage,
  setPage,
  editPageContent,
  followPage,
  unfollowPage,
  editDraft,
  deleteDraft,
};

export { pagesActions };
