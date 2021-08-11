import Select from 'react-select';
import { IParticipant } from 'common/interfaces/participant';
import { IOption } from 'common/interfaces/components/select';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useRef } from 'hooks/hooks';
import selectRoleStyles from './select-role-styles';
import styles from '../styles.module.scss';

type Props = {
  participant: IParticipant;
  options: IOption[];
  onDelete(id: string, type: string): void;
  onChange(id: string, role: string): void;
};

const Item: React.FC<Props> = ({ participant, options, onDelete, onChange }) => {
  const selectField = useRef(null);

  const onRoleChange = (selectedOption: IOption | null): void => {
    if (selectedOption) {
      const participantRole: string = selectedOption.value;
      onChange(participant.id, participantRole);
    }
  };

  const onParticipantDelete = (): void => onDelete(participant.id, participant.type);

  return (
    <tr>
      <td>{participant.name}</td>
      <td>{participant.type}</td>
      <td ref={selectField}>
        <Select
          closeOnSelect
          className={getAllowedClasses(styles.roleSelect)}
          styles={selectRoleStyles}
          isSearchable={false}
          onChange={onRoleChange}
          value={{ label: participant.role, value: participant.role }}
          options={options}
          menuPortalTarget={selectField.current}
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
