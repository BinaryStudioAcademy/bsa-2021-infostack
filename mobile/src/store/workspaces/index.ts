import { reducer as workspaceReducer, actions } from './slice';
import * as asyncActions from './async-actions';

const workspacesActions = {
  ...actions,
  ...asyncActions,
};

export { workspaceReducer, workspacesActions };
export { selectWorkspaces } from './selectors';
