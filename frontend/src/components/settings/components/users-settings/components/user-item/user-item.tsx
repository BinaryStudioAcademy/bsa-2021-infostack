import { IWorkspaceUser } from 'common/interfaces/workspace';
import Button from 'react-bootstrap/Button';

interface IUserItemProps extends IWorkspaceUser {
  onDelete: (fullName: string, id: string) => void;
}

export const UserItem: React.FC<IUserItemProps> = ({
  fullName,
  role,
  teams,
  status,
  id,
  onDelete,
}) => {
  const onDeleteUser = (): void => {
    onDelete(fullName, id);
  };

  return (
    <tr>
      <td>{fullName}</td>
      <td>{role}</td>
      <td>{teams.length ? teams.join(', ') : 'No teams found'}</td>
      <td>{status}</td>
      <td>
        <Button onClick={(): void => onDeleteUser()} variant="danger" size="sm">
          Delete
        </Button>
      </td>
    </tr>
  );
};
