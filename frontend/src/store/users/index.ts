import { reducer as usersReducer, actions } from './slice';
import * as asyncActions from './actions';

const usersActions = {
  ...actions,
  ...asyncActions,
};

export { usersReducer, usersActions };
