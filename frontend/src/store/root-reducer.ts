import { authReducer as auth } from './auth';
import { teamsReducer as teams } from './teams';
import { pagesReducer as pages } from './pages';
import { commentsReducer as comments } from './comments';
import { usersReducer as users } from './users';
import { workspacesReducer as workspaces } from './workspaces';
import { tagReducer as tags } from './tags';
import { participantsReducer as participants } from './participants';

const rootReducer = {
  auth,
  teams,
  pages,
  comments,
  users,
  workspaces,
  tags,
  participants,
};

export { rootReducer };
