/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { ReducerName, RequestStatus } from 'common/enums/enums';
import { ICommentNormalized } from 'common/interfaces/comment';
// import { ActionType } from './common';
import { RootState } from 'common/types/types';
import { fetchComments, createComment } from './actions';

const commentsAdapter = createEntityAdapter<ICommentNormalized>({
  // change to comparing createdAt
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

type State = {
  status: RequestStatus;
  error: string | null;
};

export const { reducer, actions } = createSlice({
  name: ReducerName.COMMENTS,
  initialState: commentsAdapter.getInitialState<State>({
    status: RequestStatus.IDLE,
    error: null,
  }),
  reducers: {
    // [ActionType.ADD_COMMENT]: (state, action) => {
    //   state.comments.unshift(action.payload);
    // },
    // [ActionType.ADD_RESPONSE]: (state, action) => {
    //   const parentId = action.payload.parentCommentId;
    //   state.comments = state.comments.map((comment) => {
    //     if (comment.id !== parentId) {
    //       return comment;
    //     }
    //     return {
    //       ...comment,
    //       children: [action.payload, ...(comment.children || [])],
    //     };
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        commentsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.FAILED;
        state.error = 'Could not load comments';
      });
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        const newComment = action.payload;

        if (newComment.parentCommentId !== null) {
          const parent = state.entities[
            newComment.parentCommentId
          ] as ICommentNormalized;
          commentsAdapter.updateOne(state, {
            id: newComment.parentCommentId,
            changes: {
              children: [newComment.id, ...(parent.children || [])],
            },
          });
        }
        commentsAdapter.addOne(state, action.payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.error = 'Could not add comment';
      });
    // builder
    //   .addCase(createResponse.fulfilled, (state, action) => {
    //     const parentId = action.payload.parentCommentId;

    //     state.comments = state.comments.map((comment) => {
    //       if (comment.id !== parentId) {
    //         return comment;
    //       }

    //       return {
    //         ...comment,
    //         children: [action.payload, ...(comment.children || [])],
    //       };
    //     });
    //   })
    //   .addCase(createResponse.rejected, (state) => {
    //     state.error = 'Could not add response';
    //   });
  },
});

export const commentsSelectors = commentsAdapter.getSelectors(
  (state: RootState) => state.comments,
);

export const selectRootIds = createSelector(
  commentsSelectors.selectAll,
  (comments) =>
    comments
      .filter((comment) => !comment.parentCommentId)
      .map((comment) => comment.id),
);
