import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const IconWithCount: React.FC = () => (
  <div className="position-relative">
    <div
      className={getAllowedClasses(
        styles.count,
        'rounded-circle text-white bg-primary',
      )}
    >
      4
    </div>
    <i className={getAllowedClasses(styles.chatIcon, 'bi bi-chat')}></i>
  </div>
);
