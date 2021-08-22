import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { tagApi } from 'services';
import { ITag } from 'common/interfaces/tag';

const TAG_EMPTY_NAME = 'Empty tag name is not allowed';
const TAG_SINGLE_SPEC_CHAR = 'Special characters are not allowed as tags';
const noSingleSpecCharRegex = new RegExp(/(?:(?=.*[A-Za-zа-я\d]))/g);

const loadTags = createAsyncThunk(
  ActionType.SET_TAGS,
  async (_, { dispatch }): Promise<ITag[]> => {
    const response = await tagApi.getAll();
    dispatch(actions.setTags(response));
    return response;
  },
);

const requestUpdate = createAsyncThunk(
  ActionType.UPDATE_TAG,
  async (tag: { id: string; name: string }, { dispatch }): Promise<void> => {
    try {
      if (tag.name) {
        await tagApi.update(tag.id, tag.name);
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
      if (!noSingleSpecCharRegex.test(name)) {
        dispatch(actions.setAddTagError(TAG_SINGLE_SPEC_CHAR));
      } else if (name) {
        const response = await tagApi.add(name);
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
    await tagApi.delete(id);
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
