import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { CommentApi } from 'services';
import { ICommentRequest } from 'common/interfaces/comment';

const loadComments = createAsyncThunk(
  ActionType.SET_COMMENTS,
  async (pageId: string, { dispatch }) => {
    const comments = await new CommentApi().getAll(pageId);
    dispatch(actions.setComments(comments));
  },
);

const createComment = createAsyncThunk(
  ActionType.ADD_COMMENT,
  async (
    { pageId, payload }: { pageId: string; payload: ICommentRequest },
    { dispatch },
  ) => {
    const comment = await new CommentApi().addComment(pageId, payload);
    dispatch(actions.addComment(comment));
  },
);

const createResponse = createAsyncThunk(
  ActionType.ADD_RESPONSE,
  async (
    { pageId, payload }: { pageId: string; payload: ICommentRequest },
    { dispatch },
  ) => {
    const response = await new CommentApi().addComment(pageId, payload);
    dispatch(actions.addResponse(response));
  },
);

const commentsActions = {
  ...actions,
  loadComments,
  createComment,
  createResponse,
};

export { commentsActions };
