import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { commentApi } from 'services';
import { ICommentRequest } from 'common/interfaces/comment';

const loadComments = createAsyncThunk(
  ActionType.SET_COMMENTS,
  async (pageId: string, { dispatch }) => {
    const comments = await commentApi.getAll(pageId);
    dispatch(actions.setComments(comments));
  },
);

const addComment = createAsyncThunk(
  ActionType.ADD_COMMENT,
  async ({ pageId, payload }: { pageId: string, payload: ICommentRequest }, { dispatch }) => {
    const comment = await commentApi.addComment(pageId, payload);
    dispatch(actions.addComment(comment));
  },
);

const addResponse = createAsyncThunk(
  ActionType.ADD_RESPONSE,
  async ({ pageId, payload }: { pageId: string, payload: ICommentRequest }, { dispatch }) => {
    const response = await commentApi.addComment(pageId, payload);
    dispatch(actions.addResponse(response));
  },
);

const commentsActions = {
  ...actions,
  loadComments,
  addComment,
  addResponse,
};

export {
  commentsActions,
};
