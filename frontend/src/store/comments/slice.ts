/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { normalize } from 'normalizr';
import { ReducerName, RequestStatus } from 'common/enums/enums';
import { IComment } from 'common/interfaces/comment';
// import { ActionType } from './common';
import { fetchComments } from './actions';
import { commentListSchema } from './schema';
import { RootState } from 'common/types/types';

export interface IStoreComment
  extends Pick<
    IComment,
    'id' | 'text' | 'pageId' | 'author' | 'parentCommentId'
  > {
  children: string[];
}

const commentsAdapter = createEntityAdapter<IStoreComment>({
  selectId: (comment) => comment.id,
  // change to comparing createdAt
  sortComparer: (a, b) => a.id.localeCompare(b.id),
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
        const normalized = normalize<
          any,
          {
            comments: { [key: string]: IStoreComment };
          }
        >(action.payload, commentListSchema);

        commentsAdapter.upsertMany(state, normalized.entities.comments);
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.FAILED;
        state.error = 'Could not load comments';
      });
    // builder
    //   .addCase(createComment.fulfilled, (state, action) => {
    //     state.comments.unshift(action.payload);
    //   })
    //   .addCase(createComment.rejected, (state) => {
    //     state.error = 'Could not add comment';
    //   });
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
