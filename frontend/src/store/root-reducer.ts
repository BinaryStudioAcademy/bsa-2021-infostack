import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';
import { usersReducer as users } from './users';
import { workspacesReducer as workspaces } from './workspaces';

const rootReducer = {
  auth,
  pages,
  users,
  workspaces,
};

export { rootReducer };
