import { Card, Table } from 'react-bootstrap';
import { useAppDispatch, useEffect, useAppSelector } from 'hooks/hooks';
import { TableRow } from './components/components';
import { TableHead } from '../../shared/components/components';
import { Spinner } from 'components/common/common';
import { notificationsSettingsActions } from 'store/actions';
import { RootState } from 'common/types/types';
import { NotificationType } from 'common/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const TABLE_HEADERS = ['Notification', 'System', 'Email'];

export const NotificationsSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(
    (state: RootState) => state.notificationsSettings,
  );

  useEffect(() => {
    dispatch(notificationsSettingsActions.loadNotificationsSettings());
  }, []);

  return (
    <Card
      className={`${getAllowedClasses(styles.card)} justify-content-center`}
    >
      <Card.Header
        className={getAllowedClasses(
          'd-flex justify-content-between',
          styles.header,
        )}
      >
        <Card.Title className={getAllowedClasses(styles.title)}>
          Notifications
        </Card.Title>
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.body)}>
        {isLoading ? (
          <Spinner height={'6rem'} width={'6rem'} />
        ) : (
          <Table hover>
            <TableHead headers={TABLE_HEADERS} />
            <tbody>
              <TableRow
                heading="Team"
                description="Get notified when you are added to a team"
                notificationTypeSystem={NotificationType.TEAM}
                notificationTypeEmail={NotificationType.TEAM_EMAIL}
              />
              <TableRow
                heading="Comment"
                description="Get notified about your followed pages new comments"
                notificationTypeSystem={NotificationType.COMMENT}
                notificationTypeEmail={NotificationType.COMMENT_EMAIL}
              />
              <TableRow
                heading="Page"
                description="Receiving notifications about a possible need to update the page"
                notificationTypeSystem={NotificationType.PAGE}
                notificationTypeEmail={NotificationType.PAGE_EMAIL}
              />
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
