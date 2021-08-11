import Select from 'react-dropdown-select';
import { IParticipant } from 'common/interfaces/participant';
import { IOption } from 'common/interfaces/components/select';
import { PermissionType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from '../styles.module.scss';

type Props = {
  participant: IParticipant;
  onDelete(id: string): void;
  onChange(id: string, role: string): void;
};

const Item: React.FC<Props> = ({ participant, onDelete, onChange }) => {
  const options = [
    { label: PermissionType.ADMIN, value: PermissionType.ADMIN },
    { label: PermissionType.WRITE, value: PermissionType.WRITE },
    { label: PermissionType.READ, value: PermissionType.READ },
  ];

  // eslint-disable-next-line @typescript-eslint/ban-types
  const onRoleChange = (selectedOption: {}[]): void => {
    if (selectedOption.length) {
      const participantRole: string = (selectedOption[0] as IOption).value;
      onChange(participant.id, participantRole);
    }
  };

  const onParticipantDelete = (): void => onDelete(participant.id);

  return (
    <tr>
      <td>{participant.name}</td>
      <td>{participant.type}</td>
      <td>
        <Select
          closeOnSelect
          className="zindex-dropdown w-25"
          searchable={false}
          dropdownHeight="200px"
          onChange={onRoleChange}
          values={[{ label: participant.role, value: participant.role }]}
          options={options}
        />
      </td>
      <td>
        <i
          className={getAllowedClasses('bi-trash', styles.trashIcon)}
          onClick={onParticipantDelete}
        />
      </td>
    </tr>
  );
};

export default Item;
