import { pagesReducer as pages } from './pages';
import { authReducer as auth } from './auth';
import { workspaceReducer as workspaces } from './workspaces';

export const rootReducer = {
  pages,
  auth,
  workspaces,
};
