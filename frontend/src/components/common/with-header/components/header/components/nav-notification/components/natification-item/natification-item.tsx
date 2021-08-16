import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
  body?: string;
  time: string;
};

export const NotificationItem: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  body,
  time,
}) => (
  <div
    className={getAllowedClasses(styles.natificationItem, 'd-flex px-3 py-2')}
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
      <span className={getAllowedClasses(styles.textSmall, 'text-break w-100')}>
        {time}
      </span>
    </div>
  </div>
);
