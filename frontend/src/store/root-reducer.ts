import { authReducer as auth } from './auth';
import { teamsReducer as teams } from './teams';
import { pagesReducer as pages } from './pages';
import { commentsReducer as comments } from './comments';
import { usersReducer as users } from './users';
import { workspacesReducer as workspaces } from './workspaces';
import { tagReducer as tags } from './tags';
import { skillReducer as skills } from './skills';
import { participantsReducer as participants } from './participants';
import { activitiesReducer as activities } from './activities';
import { notificationsReducer as notifications } from './notifications';
import { githubReducer as github } from './github';
import { notificationsSettingsReducer as notificationsSettings } from './notifications-settings';

const rootReducer = {
  auth,
  teams,
  pages,
  comments,
  users,
  workspaces,
  tags,
  skills,
  participants,
  activities,
  notifications,
  github,
  notificationsSettings,
};

export { rootReducer };
