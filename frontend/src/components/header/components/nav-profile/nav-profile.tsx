import Avatar from 'react-avatar';
import { AppRoute } from 'common/enums/enums';
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
        <Dropdown.Item href={ AppRoute.PROFILE }>
          <i className="bi bi-person"></i>
          Profile
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item href={ AppRoute.WORKSPACES }>
          Select Workspace
        </Dropdown.Item>
        <Dropdown.Item href={ AppRoute.SETTINGS_PROFILE }>
          Settings
        </Dropdown.Item>
        <Dropdown.Item onClick={(): void => { alert('click'); }}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;
