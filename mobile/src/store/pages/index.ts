import { reducer, actions } from './slice';
import * as asyncActions from './async-actions';

export const pagesActions = {
  ...actions,
  ...asyncActions,
};

export const pagesReducer = reducer;
