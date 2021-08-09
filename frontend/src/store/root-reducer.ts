import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  pages,
  workspaces,
};

export { rootReducer };
