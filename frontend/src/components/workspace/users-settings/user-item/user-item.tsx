import { getAllowedClasses } from 'helpers/dom/dom';
import styles from '../styles.module.scss';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import { Teams } from './teams/teams';

interface IUserItemProps extends IWorkspaceUser {}

const UserItem: React.FC<IUserItemProps> = ({ fullName, role, teams, status }) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{role}</td>
      <Teams teams={teams} />
      <td>{status}</td>
      <td>
        <i className="bi-pencil" />
        <i className={getAllowedClasses('bi-trash', styles.trashIcon)} />
      </td>
    </tr>
  );
};

export default UserItem;
