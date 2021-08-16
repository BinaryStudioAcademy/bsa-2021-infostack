import { NavItem, NavLink } from 'react-bootstrap';

export const NavDisableNotifications: React.FC = () => {
  return (
    <NavItem>
      <NavLink>
        <i className="bi bi-bell-slash"></i>
      </NavLink>
    </NavItem>
  );
};
