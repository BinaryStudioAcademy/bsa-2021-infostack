import { reducer as authReducer, actions } from './slice';
import * as asyncActions from './async-actions';

const authActions = {
  ...actions,
  ...asyncActions,
};

export { authReducer, authActions };
export { selectUser } from './selectors';
