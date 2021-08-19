import { InviteStatus } from 'common/enums/enums';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import { useAppSelector } from 'hooks/hooks';
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
  const { user } = useAppSelector((state) => state.auth);
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
        <Button
          onClick={onDeleteUser}
          variant="danger"
          size="sm"
          disabled={
            status === InviteStatus.DELETED ||
            status === InviteStatus.DECLINED ||
            id === user?.id
          }
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
