import { getAllowedClasses } from '../../../../helpers/dom/dom';
import styles from '../styles.module.scss';
import { IWorkspaceUser } from '../../../../common/interfaces/workspace';
import { AddRole } from './add-role/add-role';
import { Team } from './team/team';

interface IUserItemProps extends IWorkspaceUser {}

const UserItem: React.FC<IUserItemProps> = ({ name, role, team }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{role}</td>
      {team ? <Team team={team} /> : <AddRole />}
      <td>
        <i className="bi-pencil" />
        <i className={getAllowedClasses('bi-trash', styles.trashIcon)} />
      </td>
    </tr>
  );
};

export default UserItem;
