import { Button } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  body?: string;
  read: boolean;
  time: string;
  onRead(id: string): void;
};

export const NotificationItem: React.FC<Props> = ({
  id,
  icon,
  title,
  subtitle,
  body,
  read,
  time,
  onRead,
}) => (
  <div
    className={getAllowedClasses(
      styles.natificationItem,
      'd-flex px-3 py-2',
      read ? '' : styles.unread,
    )}
  >
    <div className="w-25 d-flex justify-content-center align-items-center">
      <i className={getAllowedClasses(styles.icon, icon)} />
    </div>
    <div className="w-75 ms-3">
      <span className={getAllowedClasses(styles.textMiddle, 'text-break')}>
        {title}
      </span>
      <span
        className={getAllowedClasses(styles.textMiddle, 'text-break w-100')}
      >
        <i>{subtitle}</i>
      </span>
      <span
        className={getAllowedClasses(
          styles.textSmall,
          'd-inline-block text-truncate w-100',
        )}
      >
        {body}
      </span>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <span
          className={getAllowedClasses(styles.textSmall, 'text-break w-100')}
        >
          {time}
        </span>
        {!read && (
          <Button
            onClick={(): void => onRead(id)}
            className={getAllowedClasses(styles.readBtn)}
            variant="success"
            size="sm"
          >
            read
          </Button>
        )}
      </div>
    </div>
  </div>
);
