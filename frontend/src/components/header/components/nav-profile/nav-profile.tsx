import Avatar from 'react-avatar';
import { AppRoute, CookieVariable } from 'common/enums/enums';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useAppDispatch, useCookies, useHistory } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { ProfileItem } from './components/profile-item/profile-item';
import './styles.scss';

type Props = {
  userName: string;
  userAvatar?: string;
  userId?: string;
};

const NavProfile: React.FC<Props> = ({ userName, userAvatar, userId }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [cookies, , removeCookie] = useCookies([
    CookieVariable.WORKSPACE_ID,
  ]);

  const onLogout = (): void => {
    dispatch(authActions.logout());
    if (cookies[CookieVariable.WORKSPACE_ID]) {
      removeCookie(CookieVariable.WORKSPACE_ID);
    }
    history.push(AppRoute.LOGIN);
    location.reload();
  };

  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} id="dropdown-profile-details">
        <Avatar
          size="40"
          name={userName}
          src={userAvatar}
          round={true}
          className="userAvatar"
        />
        <span className="text-dark userName">{userName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <ProfileItem to={AppRoute.PROFILE.slice(0, AppRoute.PROFILE.length - 3) + userId}>
          <i className="bi bi-person"></i>
          Profile
        </ProfileItem>
        <Dropdown.Divider />
        <ProfileItem to={AppRoute.WORKSPACES}>
          Select Workspace
        </ProfileItem>
        <ProfileItem to={AppRoute.SETTINGS}>
          Settings
        </ProfileItem>
        <ProfileItem onClick={onLogout}>
          Sign out
        </ProfileItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;
