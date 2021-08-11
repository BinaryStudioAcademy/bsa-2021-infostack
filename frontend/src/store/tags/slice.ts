import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ITag } from 'common/interfaces/tag';
import { ActionType } from './common';

type State = {
  tags: ITag[] | null;
  tagToEditId: string | null;
  isOpenNewTagForm: boolean;
};

const initialState: State = {
  tags: null,
  tagToEditId: null,
  isOpenNewTagForm: false,
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
      state.tagToEditId = null;
      state.isOpenNewTagForm = false;
    },
    [ActionType.SET_TAG_TO_EDIT]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagToEditId = action.payload;
    },
    [ActionType.ADD_TAG]: (state, action: PayloadAction<ITag>) => {
      state.tags?.push(action.payload);
    },
    [ActionType.DELETE_TAG]: (state, action: PayloadAction<{ id: string }>) => {
      if (state.tags) {
        if (state.tags.length === 1) {
          state.tags = [];
        } else {
          const indexToDelete = state.tags.findIndex(
            (tag) => tag.id === action.payload.id,
          );
          state.tags.splice(indexToDelete, 1);
        }
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
      state.tagToEditId = null;
    },
    [ActionType.SET_NEW_TAG_FORM]: (
      state,
      action: PayloadAction<{ isOpen: boolean }>,
    ) => {
      state.isOpenNewTagForm = action.payload.isOpen;
    },
  },
});

export { reducer, actions };
