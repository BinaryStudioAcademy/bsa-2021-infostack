import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IComment } from 'common/interfaces/comment';
import { ActionType } from './common';

type State = {
  comments: IComment[]
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
  },
});
