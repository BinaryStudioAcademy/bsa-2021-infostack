import { getAllowedClasses } from 'helpers/helpers';
import styles from '../styles.module.scss';
import { ITeamUser } from 'common/interfaces/team';

type Props = {
  participant: ITeamUser;
  onDelete(id: string): void;
};

export const Item: React.FC<Props> = ({ participant, onDelete }) => {
  const onParticipantDelete = (): void => onDelete(participant.id);

  return (
    <tr>
      <td>{participant.fullName}</td>
      <td>{participant.roleInWorkspace}</td>
      <td>
        <i
          className={getAllowedClasses('bi-trash', styles.trashIcon)}
          onClick={onParticipantDelete}
        />
      </td>
    </tr>
  );
};
