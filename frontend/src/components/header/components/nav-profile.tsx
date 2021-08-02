import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

const NavProfile: React.FC = () => {
  const userName = 'Chris Wood';
  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} id="dropdown-profile-details">
        <i className="bi bi-person-circle"></i>
        <span className="text-dark">{userName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className="dropdown-item">
          <Link to={AppRoute.PROFILE}>
            <i className="bi bi-person"></i>
            Profile
          </Link>
        </div>

        <Dropdown.Divider />

        <Dropdown.Item className="dropdown-item">
          <Link to={AppRoute.WORKSPACES}>Select Workspace</Link>
        </Dropdown.Item>

        <Dropdown.Item className="dropdown-item">
          <Link to={AppRoute.SETTINGS_PROFILE}>Settings</Link>
        </Dropdown.Item>

        <Dropdown.Item className="dropdown-item-logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;
