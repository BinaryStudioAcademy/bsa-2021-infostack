import { Dropdown, Button } from 'react-bootstrap';
import { IconWithCount, NotificationItem } from './components/components';
import {
  useAppDispatch,
  useAppSelector,
  useContext,
  useEffect,
} from 'hooks/hooks';
import { SocketContext } from 'context/socket';
import { SocketEvents } from 'common/enums/enums';
import { notificationsActions } from 'store/actions';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { EntityType } from 'common/enums/enums';

const NOTIFICATIONS_LIMIT = 4;

export const NavNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const { notifications, count, isExpanded } = useAppSelector(
    (state) => state.notifications,
  );

  const onDropdownToggle = (isOpen: boolean): void => {
    if (isOpen) {
      dispatch(notificationsActions.loadNotifications(NOTIFICATIONS_LIMIT));
    } else {
      dispatch(notificationsActions.removeNotifications());
      dispatch(notificationsActions.setIsExpanded(false));
    }
  };

  const onNotification = (): void => {
    dispatch(notificationsActions.incrementCount());
  };

  useEffect(() => {
    socket.on(SocketEvents.NOTIFICATION_NEW, onNotification);

    return (): void => {
      socket.off(SocketEvents.NOTIFICATION_NEW, onNotification);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      dispatch(notificationsActions.loadNotifications());
    } else {
      dispatch(notificationsActions.loadNotifications(NOTIFICATIONS_LIMIT));
    }
  }, [isExpanded]);

  const onShowAll = (): void => {
    dispatch(notificationsActions.removeNotifications());
    dispatch(notificationsActions.toggleIsExpanded());
  };

  return (
    <Dropdown align="end" onToggle={onDropdownToggle}>
      <Dropdown.Toggle as={Button} id="dropdown-notifications" bsPrefix="m-0">
        <IconWithCount count={count} />
      </Dropdown.Toggle>
      {!!notifications.length && (
        <Dropdown.Menu
          className={getAllowedClasses(
            styles.popover,
            isExpanded ? styles.expanded : '',
          )}
        >
          <Dropdown.Header className="text-center text-dark">
            {count} New Notifications
          </Dropdown.Header>
          {!!count && (
            <>
              <Dropdown.Divider />
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  icon={
                    notification.type === EntityType.COMMENT
                      ? 'bi bi-chat-left'
                      : 'bi bi-info-circle'
                  }
                  title={notification.title}
                  subtitle={notification.subtitle}
                  body={notification.body}
                  time="3 days ago"
                />
              ))}
              <Dropdown.Divider />
              <div
                className="d-flex justify-content-center align-items-center"
                onClick={onShowAll}
              >
                <span className={getAllowedClasses(styles.footerText)}>
                  {isExpanded ? 'Hide' : 'Show'} all messages
                </span>
              </div>
            </>
          )}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};
