import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';
import { tagReducer as tags } from './tags';

const rootReducer = {
  auth,
  pages,
  workspace,
  workspaces,
  tags,
};

export { rootReducer };
