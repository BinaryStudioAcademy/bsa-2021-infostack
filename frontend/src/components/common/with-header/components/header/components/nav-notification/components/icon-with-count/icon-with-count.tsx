import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  count: number;
};

export const IconWithCount: React.FC<Props> = ({ count }) => (
  <div className="position-relative">
    <div
      className={getAllowedClasses(
        styles.count,
        'rounded-circle text-white bg-primary',
      )}
    >
      {count}
    </div>
    <i className={getAllowedClasses(styles.chatIcon, 'bi bi-chat')}></i>
  </div>
);
