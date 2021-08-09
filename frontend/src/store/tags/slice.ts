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
    [ActionType.SetTags]: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload;
    },
    [ActionType.SetTagToEdit]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.tagToEditId = action.payload;
    },
    [ActionType.AddTag]: (state, action: PayloadAction<ITag>) => {
      state.tags?.push(action.payload);
    },
    [ActionType.DeleteTag]: (state, action: PayloadAction<{ id: string }>) => {
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
    [ActionType.UpdateTag]: (
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
    [ActionType.SetNewTagForm]: (
      state,
      action: PayloadAction<{ isOpen: boolean }>,
    ) => {
      state.isOpenNewTagForm = action.payload.isOpen;
    },
  },
});

export { reducer, actions };
