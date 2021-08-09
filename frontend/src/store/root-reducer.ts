import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';
import { commentsReducer as comments } from './comments';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  pages,
  comments,
  workspace,
  workspaces,
};

export { rootReducer };
