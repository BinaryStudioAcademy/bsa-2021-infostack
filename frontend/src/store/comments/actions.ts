import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { ActionType } from './common';
import { commentApi } from 'services';
import {
  IComment,
  ICommentRequest,
  ICommentNormalized,
} from 'common/interfaces/comment';
import { commentListSchema } from './schema';

export const fetchComments = createAsyncThunk(
  ActionType.FETCH_COMMENTS,
  async (pageId: string) => {
    const data = await commentApi.getAll(pageId);
    const normalized = normalize<
      ICommentNormalized,
      { comments: { [key: string]: ICommentNormalized } }
    >(data, commentListSchema);

    return normalized.entities.comments;
  },
);

export const createComment = createAsyncThunk<
  IComment,
  { pageId: string; payload: ICommentRequest }
>(ActionType.CREATE_COMMENT, ({ pageId, payload }) =>
  commentApi.add(pageId, payload),
);

export const deleteComment = createAsyncThunk<
  void,
  {
    id: string;
    pageId: string;
  }
>(ActionType.DELETE_COMMENT, ({ id, pageId }) => commentApi.delete(id, pageId));

export const asyncActions = {
  fetchComments,
  createComment,
  deleteComment,
};
