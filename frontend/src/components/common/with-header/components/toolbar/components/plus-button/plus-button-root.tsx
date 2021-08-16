import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const PlusButtonRoot: React.FC = () => (
  <i
    className={getAllowedClasses('bi bi-plus ms-auto fs-5', styles.plusRoot)}
  />
);
