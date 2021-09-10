import { reducersAndActions } from './reducers-and-actions.content';
import { createReducer } from './create-reducer.content';
import { createAction } from './create-action.content';
import { createSlice } from './create-slice.content';
import { createAsyncThunk } from './create-async-thunk.content';
import { createEntityAdapter } from './create-entity-adapter.content';

export const reducersAndActionsContent = [
  ...reducersAndActions,
  ...createReducer,
  ...createAction,
  ...createSlice,
  ...createAsyncThunk,
  ...createEntityAdapter,
];
