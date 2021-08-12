import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IComment } from 'common/interfaces/comment';
import { ActionType } from './common';

type State = {
  comments: IComment[];
};

const initialState: State = {
  comments: [],
};

export const { reducer, actions } = createSlice({
  name: ReducerName.COMMENTS,
  initialState,
  reducers: {
    [ActionType.SET_COMMENTS]: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    [ActionType.ADD_COMMENT]: (state, action: PayloadAction<IComment>) => {
      state.comments.unshift(action.payload);
    },
    [ActionType.ADD_RESPONSE]: (state, action: PayloadAction<IComment>) => {
      const {
        payload: { parentCommentId },
      } = action;

      const parent = state.comments.find(
        (c) => c.id === parentCommentId,
      ) as IComment;

      (parent.children = parent.children || []).unshift(action.payload);
      state.comments = state.comments.map((c) =>
        c.id === parentCommentId ? parent : c,
      );
    },
  },
});
