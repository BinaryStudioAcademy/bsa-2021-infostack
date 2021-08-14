import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

export const NavNotification: React.FC = () => {
  return (
    <NavItem>
      <NavLink>
        <i className="bi bi-bell-slash"></i>
      </NavLink>
    </NavItem>
  );
};
