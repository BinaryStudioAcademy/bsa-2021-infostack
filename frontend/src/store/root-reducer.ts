import { authReducer as auth } from './auth';
import { teamsReducer as teams } from './teams';
import { pagesReducer as pages } from './pages';
import { commentsReducer as comments } from './comments';
import { workspaceReducer as workspace } from './workspace';
import { workspacesReducer as workspaces } from './workspaces';
import { tagReducer as tags } from './tags';

const rootReducer = {
  auth,
  teams,
  pages,
  comments,
  workspace,
  workspaces,
  tags,
};

export { rootReducer };
