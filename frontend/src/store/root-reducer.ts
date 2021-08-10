import { authReducer as auth } from './auth';
import { teamsReducer as teams } from './teams';
import { pagesReducer as pages } from './pages';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  teams,
  pages,
  workspace,
  workspaces,
};

export { rootReducer };
