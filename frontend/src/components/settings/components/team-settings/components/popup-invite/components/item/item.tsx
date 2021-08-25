import { Button } from 'react-bootstrap';
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
        <Button className="btn-danger" onClick={onParticipantDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};
