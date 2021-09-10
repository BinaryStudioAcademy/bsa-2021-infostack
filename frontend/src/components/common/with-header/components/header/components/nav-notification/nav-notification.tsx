import { Dropdown, Button } from 'react-bootstrap';
import { IconWithCount, NotificationItem } from './components/components';
import {
  useAppDispatch,
  useAppSelector,
  useContext,
  useEffect,
  useState,
} from 'hooks/hooks';
import { SocketContext } from 'context/socket';
import { SocketEvents } from 'common/enums';
import { notificationsActions } from 'store/actions';
import { EntityType } from 'common/enums';
import { toDayJS, sortObjByDate, getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { INotification } from 'common/interfaces';

const NOTIFICATIONS_LIMIT = 4;

export const NavNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const { notifications, count, isExpanded } = useAppSelector(
    (state) => state.notifications,
  );
  const [notificationsToShow, setNotificationsToShow] =
    useState<INotification[]>(notifications);
  const [isFiltered, setIsFiltered] = useState(false);

  const onShowFiltered = (): void => {
    if (!isFiltered) {
      const notRead = notifications.filter((notification) => {
        return !notification.read;
      });
      setNotificationsToShow(notRead);
      setIsFiltered(true);
    } else {
      setNotificationsToShow(notifications);
      setIsFiltered(false);
    }
  };

  useEffect(() => {
    if (!isFiltered) {
      setNotificationsToShow(notifications);
    } else {
      const notRead = notifications.filter((notification) => {
        return !notification.read;
      });
      setNotificationsToShow(notRead);
    }
  }, [notifications]);

  const onNotificationNew = (): void => {
    if (isExpanded) {
      dispatch(notificationsActions.loadMoreNotifications({ limit: 1 }));
    } else {
      dispatch(notificationsActions.loadMoreNotifications({ limit: 1 }));
    }
    dispatch(notificationsActions.incrementCount());
  };

  const onNotificationDelete = (): void => {
    dispatch(notificationsActions.decrementCount());
  };

  useEffect(() => {
    socket.on(SocketEvents.NOTIFICATION_NEW, onNotificationNew);
    socket.on(SocketEvents.NOTIFICATION_DELETE, onNotificationDelete);

    setIsFiltered(false);

    return (): void => {
      socket.off(SocketEvents.NOTIFICATION_NEW, onNotificationNew);
      socket.off(SocketEvents.NOTIFICATION_DELETE, onNotificationDelete);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      dispatch(
        notificationsActions.loadMoreNotifications({
          from: NOTIFICATIONS_LIMIT,
        }),
      );
    } else {
      dispatch(
        notificationsActions.loadNotifications({ limit: NOTIFICATIONS_LIMIT }),
      );
    }
  }, [isExpanded]);

  const onDropdownToggle = (isOpen: boolean): void => {
    if (isOpen) {
      dispatch(
        notificationsActions.loadNotifications({ limit: NOTIFICATIONS_LIMIT }),
      );
    } else {
      dispatch(notificationsActions.removeNotifications());
      dispatch(notificationsActions.setIsExpanded(false));
    }
    setIsFiltered(false);
  };

  const onShowAll = (): void => {
    if (isExpanded) {
      dispatch(notificationsActions.removeNotifications());
      setIsFiltered(false);
    }
    dispatch(notificationsActions.toggleIsExpanded());
  };

  const onReadAll = (): void => {
    dispatch(notificationsActions.readAllNotifications());
  };

  const onRead = (id: string): void => {
    dispatch(notificationsActions.readNotification(id));
  };

  return (
    <Dropdown align="end" onToggle={onDropdownToggle} className="mx-2">
      <Dropdown.Toggle
        as={Button}
        id="dropdown-notifications"
        bsPrefix="m-0 mt-2"
      >
        <IconWithCount count={count} />
      </Dropdown.Toggle>
      {notifications.length ? (
        <Dropdown.Menu className={getAllowedClasses(styles.popover)}>
          <Dropdown.Header className="text-center text-dark">
            {count} New Notifications
          </Dropdown.Header>
          <Dropdown.Divider className="mb-0" />
          <div className="d-flex justify-content-around align-items-center p-1">
            <div
              className="d-flex justify-content-center align-items-center p-1"
              onClick={onShowAll}
            >
              <span className={getAllowedClasses(styles.footerText)}>
                {isExpanded ? 'Hide' : 'Show'} all messages
              </span>
            </div>

            <div
              className="d-flex justify-content-center align-items-center p-1"
              onClick={onReadAll}
            >
              <span className={getAllowedClasses(styles.footerText)}>
                Make all read
              </span>
            </div>
            {isExpanded && (
              <div
                className="d-flex justify-content-center align-items-center p-1"
                onClick={onShowFiltered}
              >
                <span className={getAllowedClasses(styles.footerText)}>
                  {!isFiltered ? 'Filter by unread' : 'Cancel filtering'}
                </span>
              </div>
            )}
          </div>
          <Dropdown.Divider className="mb-0 mt-0" />
          <div className={getAllowedClasses(isExpanded ? styles.expanded : '')}>
            {!notificationsToShow.length && isFiltered && (
              <div className={getAllowedClasses(styles.noUnread)}>
                There are no unread notifications
              </div>
            )}
            {[...notificationsToShow]
              .sort(sortObjByDate)
              .map((notification, i) => (
                <>
                  {((!isExpanded && i < 4) || isExpanded) && (
                    <>
                      <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        type={notification.type}
                        icon={
                          notification.type === EntityType.COMMENT
                            ? 'bi bi-chat-left'
                            : notification.type === EntityType.TEAM
                            ? 'bi bi-people'
                            : notification.type === EntityType.PAGE
                            ? 'bi bi-file-text-fill'
                            : 'bi bi-info-circle'
                        }
                        title={notification.title}
                        subtitle={notification.subtitle}
                        subtitleId={notification.subtitleId}
                        body={notification.body}
                        read={notification.read}
                        time={toDayJS(notification.createdAt).fromNow()}
                        onRead={onRead}
                      />
                      <Dropdown.Divider className="my-0" />
                    </>
                  )}
                </>
              ))}
          </div>
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu className={getAllowedClasses(styles.popover)}>
          <Dropdown.Header className="text-center text-dark">
            There are no notifications
          </Dropdown.Header>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};
