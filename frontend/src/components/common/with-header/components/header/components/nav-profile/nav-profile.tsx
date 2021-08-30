import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { useAppDispatch, useCookies, useHistory } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { ProfileItem } from './components/components';
import { replaceIdParam } from 'helpers/helpers';
import { UserAvatar } from 'components/common/common';
import { AppRoute, CookieVariable } from 'common/enums';
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
        <ProfileItem to={AppRoute.WORKSPACES}>Select Workspace</ProfileItem>
        <ProfileItem to={AppRoute.SETTINGS}>Settings</ProfileItem>
        <ProfileItem onClick={onLogout}>Sign out</ProfileItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};
