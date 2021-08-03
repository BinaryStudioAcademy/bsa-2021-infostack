import { authReducer as auth } from './auth';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  workspace,
  workspaces,
};

export { rootReducer };
