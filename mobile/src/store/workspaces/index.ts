import { reducer as workspaceReducer, actions } from './slice';
import * as asyncActions from './async-actions';

const workspaceActions = {
  ...actions,
  ...asyncActions,
};

export { workspaceReducer, workspaceActions };
