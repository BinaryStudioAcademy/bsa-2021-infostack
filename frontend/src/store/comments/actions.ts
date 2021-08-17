import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { commentApi } from 'services';
import { IComment, ICommentRequest } from 'common/interfaces/comment';

export const fetchComments = createAsyncThunk<IComment[], string>(
  ActionType.FETCH_COMMENTS,
  (pageId) => commentApi.getAll(pageId),
);

export const createComment = createAsyncThunk<
  IComment,
  { pageId: string; payload: ICommentRequest }
>(ActionType.CREATE_COMMENT, ({ pageId, payload }) =>
  commentApi.addComment(pageId, payload),
);

export const createResponse = createAsyncThunk<
  IComment,
  { pageId: string; payload: ICommentRequest }
>(ActionType.CREATE_RESPONSE, ({ pageId, payload }) =>
  commentApi.addComment(pageId, payload),
);

export const asyncActions = {
  fetchComments,
  createComment,
  createResponse,
};
