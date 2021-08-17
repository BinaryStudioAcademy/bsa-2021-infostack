import { Dropdown, Button } from 'react-bootstrap';
import { IconWithCount, NotificationItem } from './components/components';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { notificationsActions } from 'store/actions';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const NavNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, count } = useAppSelector(
    (state) => state.notifications,
  );

  const onDropdownToggle = (isOpen: boolean): void => {
    if (isOpen) {
      dispatch(notificationsActions.loadNotifications());
    } else {
      dispatch(notificationsActions.removeNotifications());
    }
  };

  return (
    <Dropdown align="end" onToggle={onDropdownToggle}>
      <Dropdown.Toggle as={Button} id="dropdown-notifications" bsPrefix="m-0">
        <IconWithCount count={count} />
      </Dropdown.Toggle>
      <Dropdown.Menu className={getAllowedClasses(styles.popover)}>
        <Dropdown.Header className="text-center text-dark">
          {count} New Notifications
        </Dropdown.Header>
        <Dropdown.Divider />
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            icon="bi bi-chat-left"
            title={notification.title}
            subtitle={notification.subtitle}
            body={notification.body}
            time="3 days ago"
          />
        ))}
        <Dropdown.Divider />
        <div className="d-flex justify-content-center align-items-center">
          <span className={getAllowedClasses(styles.footerText)}>
            Show all messages
          </span>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
