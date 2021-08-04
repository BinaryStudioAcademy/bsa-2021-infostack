import Button from 'react-bootstrap/Button';
import './styles.scss';

interface ICreateTeamButtonProps {
  onClick(): void;
}

const CreateTeamButton: React.FC<ICreateTeamButtonProps> = ({ onClick }) =>
  (
    <Button
      variant="primary"
      className="create-team-button float-right"
      onClick={onClick}>
      + New team
    </Button>
  );

export default CreateTeamButton;
