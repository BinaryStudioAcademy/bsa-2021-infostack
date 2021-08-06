import { getAllowedClasses } from 'helpers/dom/dom';
import styles from '../../styles.module.scss';

const PlusButtonRoot: React.FC = () =>
  <i className={getAllowedClasses('bi bi-plus ms-auto fs-5', styles.plusRoot)}/>;

export default PlusButtonRoot;
