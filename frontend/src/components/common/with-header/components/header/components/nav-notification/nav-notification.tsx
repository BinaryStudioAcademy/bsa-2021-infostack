import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { IconWithCount, NotificationItem } from './components/components';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const NavNotification: React.FC = () => {
  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} id="dropdown-notifications" bsPrefix="m-0">
        <IconWithCount />
      </Dropdown.Toggle>
      <Dropdown.Menu className={getAllowedClasses(styles.popover)}>
        <Dropdown.Header className="text-center text-dark">
          4 New Notifications
        </Dropdown.Header>
        <Dropdown.Divider />
        <NotificationItem
          icon="bi bi-chat-left"
          title="New comment from FF"
          subtitle="Page1"
          message="qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
          time="3 days ago"
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};
