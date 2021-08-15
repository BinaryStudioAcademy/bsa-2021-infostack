import Select from 'react-select';
import Badge from 'react-bootstrap/Badge';
import { IParticipant } from 'common/interfaces/participant';
import { IOption } from 'common/interfaces/components/select';
import { useRef } from 'hooks/hooks';
import selectRoleStyles from './select-role-styles';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../styles.module.scss';

type Props = {
  participant: IParticipant;
  options: IOption[];
  onDelete(id: string, type: string): void;
  onChange(id: string, role: string): void;
};

export const Item: React.FC<Props> = ({
  participant,
  options,
  onDelete,
  onChange,
}) => {
  const selectField = useRef(null);

  const onRoleChange = (selectedOption: IOption | null): void => {
    if (selectedOption) {
      const participantRole: string = selectedOption.value;
      onChange(participant.id, participantRole);
    }
  };

  const onParticipantDelete = (): void =>
    onDelete(participant.id, participant.type);

  return (
    <tr>
      <td>{participant.name}</td>
      <td>
        <h6>
          <Badge
            bg={participant.type === 'user' ? 'info' : 'danger'}
            style={{ fontWeight: 'unset' }}
          >
            {participant.type}
          </Badge>
        </h6>
      </td>
      <td ref={selectField}>
        <Select
          closeOnSelect
          className={getAllowedClasses(styles.roleSelect)}
          styles={selectRoleStyles}
          isSearchable={false}
          onChange={onRoleChange}
          value={{ label: participant.role, value: participant.role }}
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
