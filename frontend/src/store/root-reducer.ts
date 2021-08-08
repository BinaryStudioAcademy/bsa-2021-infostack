import { authReducer as auth } from './auth';
import { settingsReducer as settings } from './settings';
import { pagesReducer as pages } from './pages';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  settings,
  pages,
  workspace,
  workspaces,
};

export { rootReducer };
