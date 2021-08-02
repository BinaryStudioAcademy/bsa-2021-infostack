import { getAllowedClasses } from '../../../../helpers/dom/dom';
import styles from '../styles.module.scss';
import { IWorkspaceUser } from '../../../../common/interfaces/workspace';
import { AddRole } from './add-role/add-role';
import { Teams } from './teams/teams';

interface IUserItemProps extends IWorkspaceUser {}

const UserItem: React.FC<IUserItemProps> = ({ fullName, role, teams }) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{role}</td>
      {teams.length ? <Teams teams={teams} /> : <AddRole />}
      <td>
        <i className="bi-pencil" />
        <i className={getAllowedClasses('bi-trash', styles.trashIcon)} />
      </td>
    </tr>
  );
};

export default UserItem;
