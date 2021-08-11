import { IParticipant } from 'common/interfaces/participant';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from '../styles.module.scss';

type Props = {
  participant: IParticipant;
  onDelete(id: string): void;
};

const Item: React.FC<Props> = ({ participant, onDelete }) => {
  return (
    <tr>
      <td>{participant.name}</td>
      <td>{participant.type}</td>
      <td>role</td>
      <td>
        <i
          className={getAllowedClasses('bi-trash', styles.trashIcon)}
          onClick={():void => onDelete(participant.id)}
        />
      </td>
    </tr>
  );
};

export default Item;
