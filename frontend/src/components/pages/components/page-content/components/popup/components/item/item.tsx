import { getAllowedClasses } from 'helpers/dom/dom';
import styles from '../styles.module.scss';

type Props = {
  fullName: string;
  role: string;
};

const Item: React.FC<Props> = ({ fullName, role }) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>User</td>
      <td>{role}</td>
      <td>
        <i className={getAllowedClasses('bi-trash', styles.trashIcon)} />
      </td>
    </tr>
  );
};

export default Item;
