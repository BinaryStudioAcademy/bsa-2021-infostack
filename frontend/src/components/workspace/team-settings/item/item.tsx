import Avatar from 'react-avatar';
import { Card } from 'react-bootstrap';
import { ITeam, ITeamUser } from 'common/interfaces/team';
import DropDown from '../drop-down/drop-down';
import './styles.scss';

interface Props {
  team: ITeam;
}

const TeamItem: React.FC<Props> = ({ team }) => {
  const renderUserAvatar = (user: ITeamUser): JSX.Element => {
    return (
      <Avatar
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
    <Card className="team-card shadow rounded border-0 p-2">
      <Card.Title className="team-name d-flex justify-content-between">
        {team.name}
        <DropDown team={team} />
      </Card.Title>
      <Card.Body className="d-flex justify-content-between card-body">
        {team.users && (
          <div className="avatars-container">
            {team.users.map((user) => renderUserAvatar(user))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
export default TeamItem;
