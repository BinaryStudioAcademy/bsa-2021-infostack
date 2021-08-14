import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { TagApi } from 'services';

const TAG_EMPTY_NAME = 'Empty tag name is not allowed';

const loadTags = createAsyncThunk(
  ActionType.SET_TAGS,
  async (_, { dispatch }): Promise<void> => {
    const response = await new TagApi().getAll();
    dispatch(actions.setTags(response));
  },
);

const requestUpdate = createAsyncThunk(
  ActionType.UPDATE_TAG,
  async (tag: { id: string; name: string }, { dispatch }): Promise<void> => {
    try {
      if (tag.name) {
        await new TagApi().update(tag.id, tag.name);
        dispatch(actions.updateTag({ id: tag.id, updatedName: tag.name }));
        dispatch(actions.setEditName(null));
      } else {
        dispatch(actions.setEditTagError(TAG_EMPTY_NAME));
      }
    } catch (err) {
      dispatch(actions.setEditTagError(err.message));
    }
  },
);

const requestAdd = createAsyncThunk(
  ActionType.ADD_TAG,
  async (name: string, { dispatch }): Promise<void> => {
    try {
      if (name) {
        const response = await new TagApi().add(name);
        dispatch(actions.addTag(response));
        dispatch(actions.setAddName(null));
      } else {
        dispatch(actions.setAddTagError(TAG_EMPTY_NAME));
      }
    } catch (err) {
      dispatch(actions.setAddTagError(err.message));
    }
  },
);

const requestDelete = createAsyncThunk(
  ActionType.DELETE_TAG,
  async (id: string, { dispatch }): Promise<void> => {
    await new TagApi().delete(id);
    dispatch(actions.deleteTag(id));
  },
);

const tagActions = {
  ...actions,
  loadTags,
  requestUpdate,
  requestAdd,
  requestDelete,
};

export { tagActions, requestUpdate };
