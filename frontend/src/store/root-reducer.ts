import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  workspace,
  workspaces,
  pages,
};

export { rootReducer };
