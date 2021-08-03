import { authReducer as auth } from './auth';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  workspaces,
};

export { rootReducer };
