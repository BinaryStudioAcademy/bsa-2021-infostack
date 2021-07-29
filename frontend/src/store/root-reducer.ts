import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  counter,
  auth,
  workspaces,
};

export { rootReducer };
