import { reducer as commentsReducer, actions } from './slice';
import { asyncActions } from './actions';

const commentsActions = {
  ...actions,
  ...asyncActions,
};

export { commentsReducer, commentsActions };
