import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { commentApi } from 'services';

const loadComments = createAsyncThunk(
  ActionType.SET_COMMENTS,
  async (pageId: string, { dispatch }) => {
    const comments = await commentApi.getAll(pageId);
    dispatch(actions.setComments(comments));
  },
);

const commentsActions = {
  ...actions,
  loadComments,
};

export {
  commentsActions,
};
