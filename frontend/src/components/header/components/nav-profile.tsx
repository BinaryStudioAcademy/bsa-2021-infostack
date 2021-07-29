import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import profileNoPhoto from 'assets/img/profile-no-photo.svg';
import profileIcon from 'assets/img/profile-icon.svg';

const NavProfile: React.FC = () => {
  const userName = 'Chris Wood';
  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} id="dropdown-profile-details">
        <img
          src={profileNoPhoto}
          className="profile-photo-thumbnail"
          alt="default profile photo"
        />
        <span className="text-dark">{userName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/profile">
          <img src={profileIcon} alt="profile icon" />
          <span>Profile</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/workspace">Select Workspace</Dropdown.Item>
        <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
        <Dropdown.Item href="#/sign-out">Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;
