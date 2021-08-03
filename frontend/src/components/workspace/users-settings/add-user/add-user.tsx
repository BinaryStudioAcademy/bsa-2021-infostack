import styles from '../styles.module.scss';
import { TABLE_HEADERS } from '../users-settings';

const AddUser: React.FC = () => {
  return (
    <tr className={styles.addUser}>
      <td colSpan={TABLE_HEADERS.length}>+</td>
    </tr>
  );
};

export default AddUser;
