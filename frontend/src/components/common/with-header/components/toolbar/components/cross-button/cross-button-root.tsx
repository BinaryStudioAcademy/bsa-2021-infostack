import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const CrossButtonRoot: React.FC = () => (
  <i className={getAllowedClasses('bi bi-x ms-auto fs-5', styles.plusRoot)} />
);
