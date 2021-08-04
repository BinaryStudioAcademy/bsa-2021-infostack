import Avatar from 'react-avatar';
import { AppRoute, CookieVariable } from 'common/enums/enums';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useAppDispatch, useCookies, useHistory } from 'hooks/hooks';
import { Link } from 'react-router-dom';
import { authActions } from 'store/actions';
import './styles.scss';

interface INavProfileProps {
  userName: string;
  userAvatar?: string;
}

const NavProfile: React.FC<INavProfileProps> = ({ userName, userAvatar }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [, , removeCookie] = useCookies(['cookie-name']);

  const onLogout = (): void => {
    dispatch(authActions.logout());
    removeCookie(CookieVariable.WORKSPACE_ID);
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
        <span className="text-dark">{userName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item as={Link} to={AppRoute.PROFILE}>
          <i className="bi bi-person"></i>
          Profile
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item as={Link} to={AppRoute.WORKSPACES}>
          Select Workspace
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={AppRoute.SETTINGS}>
          Setting
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout} className="dropdown-item">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;
