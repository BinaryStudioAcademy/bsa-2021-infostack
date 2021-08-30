import { Button } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import { EntityType, AppRoute } from 'common/enums';
import styles from './styles.module.scss';

type Props = {
  id: string;
  type: EntityType;
  icon: string;
  title: string;
  subtitle?: string;
  subtitleId?: string | undefined;
  body?: string;
  read: boolean;
  time: string;
  onRead(id: string): void;
};

export const NotificationItem: React.FC<Props> = ({
  id,
  type,
  icon,
  title,
  subtitle,
  subtitleId,
  body,
  read,
  time,
  onRead,
}) => {
  const link = (entityType: EntityType): JSX.Element => {
    switch (entityType) {
      case EntityType.COMMENT: {
        if (subtitleId) {
          return (
            <Link
              to={replaceIdParam(AppRoute.PAGE, subtitleId)}
              className={getAllowedClasses(styles.link)}
            >
              <span
                className={getAllowedClasses(styles.textMiddle, 'text-break')}
              >
                {title}
              </span>
            </Link>
          );
        }
        break;
      }
      case EntityType.PAGE: {
        if (subtitleId) {
          return (
            <Link
              to={replaceIdParam(AppRoute.PAGE, subtitleId)}
              className={getAllowedClasses(styles.link)}
            >
              <span
                className={getAllowedClasses(styles.textMiddle, 'text-break')}
              >
                {title}
              </span>
            </Link>
          );
        }
        break;
      }
      case EntityType.TEAM: {
        return (
          <Link
            to={AppRoute.SETTINGS_TEAMS}
            className={getAllowedClasses(styles.link)}
          >
            <span
              className={getAllowedClasses(styles.textMiddle, 'text-break')}
            >
              {title}
            </span>
          </Link>
        );
      }
    }

    return (
      <span className={getAllowedClasses(styles.textMiddle, 'text-break')}>
        {title}
      </span>
    );
  };

  return (
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
        {link(type)}

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
};
