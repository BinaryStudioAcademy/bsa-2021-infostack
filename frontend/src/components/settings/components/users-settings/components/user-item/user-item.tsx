import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useAppSelector } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import { InviteStatus } from 'common/enums/enums';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import styles from './styles.module.scss';

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

  const teamsList = teams.length ? teams.join(', ') : 'No teams found';

  return (
    <tr>
      <td>{fullName}</td>
      <td>{role}</td>
      <OverlayTrigger
        trigger="hover"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-bottom">
            <Popover.Body className={getAllowedClasses(styles.popoverText)}>
              {teamsList}
            </Popover.Body>
          </Popover>
        }
      >
        <td>{teamsList}</td>
      </OverlayTrigger>
      <td>{status}</td>
      <td>
        <Button
          onClick={(): void => onDeleteUser()}
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
