import { IWorkspaceUser } from 'common/interfaces/workspace';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

interface IUserItemProps extends IWorkspaceUser {}

export const UserItem: React.FC<IUserItemProps> = ({
  fullName,
  role,
  teams,
  status,
}) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{role}</td>
      <td>{teams.length ? teams.join(', ') : 'No teams found'}</td>
      <td>{status}</td>
      <td>
        <i className="bi-pencil" />
        <i className={getAllowedClasses('bi-trash', styles.trashIcon)} />
      </td>
    </tr>
  );
};
