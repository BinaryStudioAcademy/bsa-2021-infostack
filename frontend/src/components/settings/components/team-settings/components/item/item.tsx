import { Card } from 'react-bootstrap';
import { ITeam, ITeamUser } from 'common/interfaces/team';
import { DropDown } from '../components';
import { UserAvatar } from 'components/common/avatar/avatar';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  team: ITeam;
};

export const Item: React.FC<Props> = ({ team }) => {
  const renderUserAvatar = (user: ITeamUser): JSX.Element => {
    return (
      <UserAvatar
        key={user.id}
        size="40"
        name={user.fullName}
        src={user.avatar}
        round={true}
        className="userAvatar"
      />
    );
  };

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
      <Card.Body className="d-flex justify-content-between">
        {team.users && (
          <div className={getAllowedClasses(styles.avatarsContainer)}>
            {team.users.map((user) => renderUserAvatar(user))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
