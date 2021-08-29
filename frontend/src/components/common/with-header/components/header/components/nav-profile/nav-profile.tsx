import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { useAppDispatch, useCookies, useHistory } from 'hooks/hooks';
import {
  activitiesActions,
  authActions,
  githubActions,
  notificationsActions,
  notificationsSettingsActions,
  pagesActions,
  participantsActions,
  tagActions,
  teamsActions,
  usersActions,
  workspacesActions,
} from 'store/actions';
import { ProfileItem } from './components/components';
import { replaceIdParam } from 'helpers/helpers';
import { UserAvatar } from 'components/common/common';
import {
  AppRoute,
  CookieVariable,
  LocalStorageVariable,
} from 'common/enums/enums';
import './styles.scss';

type Props = {
  userName: string;
  userAvatar?: string;
  userId?: string;
};

export const NavProfile: React.FC<Props> = ({
  userName,
  userAvatar,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [cookies, , removeCookie] = useCookies([CookieVariable.WORKSPACE_ID]);

  const cleanWorkspaceStore = (): void => {
    dispatch(activitiesActions.reset());
    dispatch(githubActions.reset());
    dispatch(notificationsActions.reset());
    dispatch(notificationsSettingsActions.reset());
    dispatch(pagesActions.reset());
    dispatch(participantsActions.reset());
    dispatch(tagActions.reset());
    dispatch(teamsActions.reset());
    dispatch(usersActions.reset());
  };

  const onLogout = (): void => {
    cleanWorkspaceStore();
    dispatch(authActions.reset());
    dispatch(workspacesActions.reset());
    dispatch(authActions.logout());
    if (cookies[CookieVariable.WORKSPACE_ID]) {
      removeCookie(CookieVariable.WORKSPACE_ID);
    }
    localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageVariable.GITHUB_ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
    history.push(AppRoute.LOGIN);
  };

  const onSelectWorkspace = (): void => {
    cleanWorkspaceStore();
    history.push(AppRoute.WORKSPACES);
  };

  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} id="dropdown-profile-details">
        <UserAvatar
          size="35"
          name={userName}
          src={userAvatar}
          round={true}
          className="userAvatar"
          showTooltip={false}
        />
        <span className="text-dark userName">{userName}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ProfileItem to={replaceIdParam(AppRoute.PROFILE, userId || '')}>
          <i className="bi bi-person"></i>
          Profile
        </ProfileItem>
        <Dropdown.Divider />
        <ProfileItem onClick={onSelectWorkspace}>Select Workspace</ProfileItem>
        <ProfileItem to={AppRoute.SETTINGS}>Settings</ProfileItem>
        <ProfileItem onClick={onLogout}>Sign out</ProfileItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};
