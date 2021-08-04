import { ITeam } from 'common/interfaces/team';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './styles.scss';

interface ITeamItemProps {
  team: ITeam;
  onClick( id: string ): void;
}

const TeamItem: React.FC<ITeamItemProps> = ({ team, onClick }) =>
  (
    <Card className="team-card shadow-sm rounded border-0">
      <Button
        variant="light"
        className="bg-white text-secondary h-100"
        onClick={():void => onClick(team.id)}>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Title>{ team.name }</Card.Title>
        </Card.Body>
      </Button>
    </Card>
  );

export default TeamItem;
