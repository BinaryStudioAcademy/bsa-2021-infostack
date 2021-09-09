import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import {
  useAppDispatch,
  useAppSelector,
  useContext,
  useCookies,
  useHistory,
} from 'hooks/hooks';
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
  SocketEvents,
} from 'common/enums';
import { SocketContext } from 'context/socket';
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
  const socket = useContext(SocketContext);

  const [cookies, , removeCookie] = useCookies([CookieVariable.WORKSPACE_ID]);
  const { currentPage } = useAppSelector((state) => state.pages);

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
    socket.emit(SocketEvents.SIGN_OUT, userId, currentPage?.id);
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
          <div className="d-flex align-items-center">
            <i className="bi bi-person"></i>
            Profile
          </div>
        </ProfileItem>
        <Dropdown.Divider />
        <ProfileItem onClick={onSelectWorkspace}>Select Workspace</ProfileItem>
        <ProfileItem to={AppRoute.SETTINGS}>Settings</ProfileItem>
        <ProfileItem onClick={onLogout}>Sign out</ProfileItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};
