import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityState,
} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { ReducerName, RequestStatus } from 'common/enums';
import { ICommentNormalized } from 'common/interfaces/comment';
import { RootState } from 'common/types/types';
import { fetchComments, createComment, deleteComment } from './actions';
import { ActionType } from './common';

const commentsAdapter = createEntityAdapter<ICommentNormalized>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

type State = {
  fetchStatus: RequestStatus;
  createStatus: RequestStatus;
  deleteStatus: RequestStatus;
  error: string | null;
};

const addComment = (
  state: EntityState<ICommentNormalized> & State,
  action: PayloadAction<ICommentNormalized>,
): void => {
  state.createStatus = RequestStatus.IDLE;

  const comment = action.payload;
  const { id, parentCommentId } = comment;

  if (parentCommentId !== null) {
    const parent = state.entities[parentCommentId] as ICommentNormalized;

    const children = parent.children?.filter((child) => child !== id) || [];

    commentsAdapter.updateOne(state, {
      id: parentCommentId,
      changes: {
        children: [id, ...(children || [])],
      },
    });
  }

  commentsAdapter.upsertOne(state, comment);
};

const removeComment = (
  state: EntityState<ICommentNormalized> & State,
  id: string,
): void => {
  state.deleteStatus = RequestStatus.IDLE;

  const comment = state.entities[id] as ICommentNormalized;
  if (!comment) {
    return;
  }
  if (comment.parentCommentId !== null) {
    const parent = state.entities[
      comment.parentCommentId
    ] as ICommentNormalized;

    commentsAdapter.updateOne(state, {
      id: parent.id,
      changes: {
        children: parent.children?.filter((childId) => childId !== id),
      },
    });
  }

  commentsAdapter.removeOne(state, id);
};

export const { reducer, actions } = createSlice({
  name: ReducerName.COMMENTS,
  initialState: commentsAdapter.getInitialState<State>({
    fetchStatus: RequestStatus.IDLE,
    createStatus: RequestStatus.IDLE,
    deleteStatus: RequestStatus.IDLE,
    error: null,
  }),
  reducers: {
    [ActionType.ADD_COMMENT]: addComment,
    [ActionType.REMOVE_COMMENT]: (state, action) => {
      const id = action.payload;

      removeComment(state, id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchStatus = RequestStatus.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.fetchStatus = RequestStatus.SUCCEEDED;
        commentsAdapter.removeAll(state);
        if (action.payload) {
          commentsAdapter.upsertMany(state, action.payload);
        }
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchStatus = RequestStatus.FAILED;
        state.error = 'Could not load comments';
      });
    builder
      .addCase(createComment.pending, (state) => {
        state.createStatus = RequestStatus.LOADING;
      })
      .addCase(createComment.fulfilled, addComment)
      .addCase(createComment.rejected, (state) => {
        state.createStatus = RequestStatus.FAILED;
        state.error = 'Could not add comment';
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.deleteStatus = RequestStatus.LOADING;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { id } = action.meta.arg;

        removeComment(state, id);
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteStatus = RequestStatus.FAILED;
        state.error = 'Could not delete comment';
      });
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
