import Avatar from 'react-avatar';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import './styles.scss';

interface INavProfileProps {
  userName: string;
  userAvatar?: string;
}

const NavProfile: React.FC<INavProfileProps> = ({ userName, userAvatar }) => {
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

      <Dropdown.Menu>
        <Dropdown.Item>
          <Link to={AppRoute.PROFILE}>
            <i className="bi bi-person"></i>
            Profile
          </Link>
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item>
          <Link to={AppRoute.WORKSPACES}>Select Workspace</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to={AppRoute.SETTINGS_PROFILE}>Settings</Link>
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item-logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;
