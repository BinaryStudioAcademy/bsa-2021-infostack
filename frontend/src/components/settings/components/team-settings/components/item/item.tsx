import { Card } from 'react-bootstrap';
import { ITeam } from 'common/interfaces/team';
import { DropDown } from '../components';
import { UserAvatar } from 'components/common/avatar/avatar';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const Item: React.FC<{ team: ITeam }> = ({ team }) => {
  return (
    <Card
      className={getAllowedClasses(
        styles.teamCard,
        'shadow rounded border-0 p-2',
      )}
    >
      <Card.Title
        className={getAllowedClasses(
          styles.teamName,
          'd-flex justify-content-between m-0 p-3',
        )}
      >
        {team.name}
        <DropDown team={team} />
      </Card.Title>
      <Card.Body className="d-flex flex-wrap card-body">
        {team.users &&
          team.users.map((user) => (
            <UserAvatar
              key={user.id}
              size="40"
              name={user.fullName}
              src={user.avatar}
              round={true}
              className={getAllowedClasses(styles.userAvatar)}
            />
          ))}
      </Card.Body>
    </Card>
  );
};
