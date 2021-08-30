import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ITag } from 'common/interfaces/tag';
import { ActionType } from './common';

type State = {
  tags: ITag[] | null;
  tagAddName: string | null;
  tagEditId: string | null;
  tagEditName: string | null;
  tagAddError: string | null;
  tagEditError: string | null;
};

const initialState: State = {
  tags: null,
  tagAddName: null,
  tagAddError: null,
  tagEditId: null,
  tagEditName: null,
  tagEditError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.TAGS,
  initialState,
  reducers: {
    [ActionType.SET_TAGS]: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload;
    },
    [ActionType.RESET_TAGS]: (state, _action: PayloadAction<void>) => {
      state.tags = null;
      state.tagAddName = null;
      state.tagAddError = null;
      state.tagEditId = null;
      state.tagEditName = null;
      state.tagEditError = null;
    },
    [ActionType.SET_TAG_TO_EDIT]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagEditId = action.payload;
      state.tagAddName = null;
      state.tagAddError = null;
      state.tagEditError = null;
      if (state.tags && state.tagEditId) {
        const tagEdit = state.tags.find((tag) => tag.id === action.payload);
        if (tagEdit) {
          state.tagEditName = tagEdit.name;
        }
      } else {
        state.tagEditName = null;
      }
    },
    [ActionType.ADD_TAG]: (state, action: PayloadAction<ITag>) => {
      state.tags?.push(action.payload);
      state.tagAddName = null;
      state.tagAddError = null;
      state.tagEditId = null;
      state.tagEditName = null;
      state.tagEditError = null;
    },
    [ActionType.DELETE_TAG]: (state, action: PayloadAction<string>) => {
      if (state.tags) {
        const indexToDelete = state.tags.findIndex(
          (tag) => tag.id === action.payload,
        );
        state.tags.splice(indexToDelete, 1);
      }
    },
    [ActionType.UPDATE_TAG]: (
      state,
      action: PayloadAction<{ id: string; updatedName: string }>,
    ) => {
      const updatedTag = state.tags?.find(
        (tag) => tag.id === action.payload.id,
      );
      if (updatedTag) {
        updatedTag.name = action.payload.updatedName;
      }
      state.tagEditId = null;
    },
    [ActionType.SET_ADD_TAG_ERROR]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagAddError = action.payload;
    },
    [ActionType.SET_ADD_NAME]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagAddName = action.payload;
    },
    [ActionType.SET_EDIT_TAG_ERROR]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagEditError = action.payload;
    },
    [ActionType.SET_EDIT_NAME]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagEditName = action.payload;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
