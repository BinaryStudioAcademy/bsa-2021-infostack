import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Select from 'react-select';
import { useAppSelector } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import { InviteStatus, RoleType } from 'common/enums';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import { IOption } from 'common/interfaces';
import selectRoleStyles from './select-role-styles';
import styles from './styles.module.scss';

interface IUserItemProps extends IWorkspaceUser {
  options: IOption[];
  className: string;
  onDelete: (fullName: string, id: string) => void;
  onChange: (userId: string, role: RoleType, fullname: string) => void;
}

export const UserItem: React.FC<IUserItemProps> = ({
  fullName,
  role,
  teams,
  status,
  id,
  options,
  onDelete,
  onChange,
  className,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const isDisabled = status === InviteStatus.DECLINED || id === user?.id;

  const onDeleteUser = (): void => {
    onDelete(fullName, id);
  };

  const onRoleChange = (selectedOption: IOption | null): void => {
    if (selectedOption) {
      const participantRole: string = selectedOption.value;
      onChange(id, participantRole as RoleType, fullName);
    }
  };

  const teamsList = teams.length ? teams.join(', ') : 'No teams found';

  return (
    <tr className={getAllowedClasses(styles.tableRow)}>
      <td>{fullName}</td>
      <td className={className}>
        <Select
          styles={selectRoleStyles}
          className={getAllowedClasses(styles.roleSelect)}
          isSearchable={false}
          onChange={onRoleChange}
          value={{ label: role as string, value: role as string }}
          options={options}
          isDisabled={isDisabled}
        />
      </td>
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
          onClick={onDeleteUser}
          variant="danger"
          size="sm"
          disabled={isDisabled}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
