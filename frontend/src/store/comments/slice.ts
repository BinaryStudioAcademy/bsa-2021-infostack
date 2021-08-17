import { createSlice } from '@reduxjs/toolkit';
import { ReducerName, RequestStatus } from 'common/enums/enums';
import { IComment } from 'common/interfaces/comment';
import { ActionType } from './common';
import { fetchComments, createComment, createResponse } from './actions';

type State = {
  comments: IComment[];
  status: RequestStatus;
  error: string | null;
};

const initialState: State = {
  comments: [],
  status: RequestStatus.IDLE,
  error: null,
};

export const { reducer, actions } = createSlice({
  name: ReducerName.COMMENTS,
  initialState,
  reducers: {
    [ActionType.ADD_COMMENT]: (state, action) => {
      state.comments.unshift(action.payload);
    },
    [ActionType.ADD_RESPONSE]: (state, action) => {
      const parentId = action.payload.parentCommentId;

      state.comments = state.comments.map((comment) => {
        if (comment.id !== parentId) {
          return comment;
        }

        return {
          ...comment,
          children: [action.payload, ...(comment.children || [])],
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.FAILED;
        state.error = 'Could not load comments';
      });
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.error = 'Could not add comment';
      });
    builder
      .addCase(createResponse.fulfilled, (state, action) => {
        const parentId = action.payload.parentCommentId;

        state.comments = state.comments.map((comment) => {
          if (comment.id !== parentId) {
            return comment;
          }

          return {
            ...comment,
            children: [action.payload, ...(comment.children || [])],
          };
        });
      })
      .addCase(createResponse.rejected, (state) => {
        state.error = 'Could not add response';
      });
  },
});
