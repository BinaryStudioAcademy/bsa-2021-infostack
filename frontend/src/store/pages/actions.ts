import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';

const getPagesAsync = createAsyncThunk(
  ActionType.setPages,
  async (payload: undefined, { dispatch }) => {
    try {
      const response = await new PageApi().get();
      dispatch(actions.setPages(response));
    } catch (error) {
      alert(error);
    }
  },
);

const pagesActions = {
  ...actions,
  getPagesAsync,
};

export {
  pagesActions,
};
