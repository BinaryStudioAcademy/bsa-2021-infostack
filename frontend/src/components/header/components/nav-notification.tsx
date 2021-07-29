import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import notificationNone from 'assets/img/notification-none.svg';

const NavNotification: React.FC = () => {
  return (
    <NavItem>
      <NavLink>
        <img src={notificationNone} alt="notification bell" />
      </NavLink>
    </NavItem>
  );
};

export default NavNotification;
