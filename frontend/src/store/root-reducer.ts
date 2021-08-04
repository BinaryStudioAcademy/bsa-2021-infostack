import { authReducer as auth } from './auth';
import { settingsReducer as settings } from './settings';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  settings,
  workspaces,
};

export { rootReducer };
