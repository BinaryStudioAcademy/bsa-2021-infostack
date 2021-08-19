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
        'rounded-circle text-white bg-success',
      )}
    >
      {count}
    </div>
    <i className={getAllowedClasses(styles.bellIcon, 'bi bi-bell')}></i>
  </div>
);
