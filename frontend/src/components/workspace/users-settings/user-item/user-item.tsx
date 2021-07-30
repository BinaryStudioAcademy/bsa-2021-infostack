import { getAllowedClasses } from '../../../../helpers/dom/dom';
import styles from '../styles.module.scss';

// TODO: update props type
interface IUserItemProps {
  id: number;
  name: string;
  role: string;
  team?: string;
}

const UserItem: React.FC<IUserItemProps> = ({ id, name, role, team }) => {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{role}</td>
      <td>{team}</td>
      <td>
        <i className="bi-pencil" />
        <i className={getAllowedClasses('bi-trash', styles.trashIcon)} />
      </td>
    </tr>
  );
};

export default UserItem;
