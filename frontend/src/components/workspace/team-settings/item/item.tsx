import Avatar from 'react-avatar';
import { Button, Card } from 'react-bootstrap';
import { ITeam, ITeamUser } from 'common/interfaces/team';
import DropDown from '../drop-down/drop-down';
import './styles.scss';

interface Props {
  team: ITeam;
  onClick(id: string): void;
}

const TeamItem: React.FC<Props> = ({ team, onClick }) => {
  const renderUserAvatar = (user: ITeamUser): JSX.Element => {
    return <Avatar
      key={user.id}
      size="40"
      name={user.fullName}
      src={user.avatar}
      round={true}
      className="userAvatar"
    />;
  };

  return (
    <Card className="team-card shadow rounded border-0 p-2">
      <Button
        variant="light"
        className="bg-white text-secondary h-100"
        onClick={(): void => onClick(team.id)}>
        <Card.Title className="team-name d-flex justify-content-between">
          {team.name}
          <DropDown team={team} />
        </Card.Title>
        <Card.Body className="d-flex justify-content-between card-body">
          {
            team.users && <div className="avatars-container">
              {team.users.map((user) => renderUserAvatar(user))}
            </div>
          }
        </Card.Body>
      </Button>
    </Card>
  );
};
export default TeamItem;
