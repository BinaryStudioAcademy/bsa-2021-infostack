import Button from 'react-bootstrap/Button';
import './styles.scss';

interface ICreateButtonProps {
  onClick(): void;
}

const CreateButton: React.FC<ICreateButtonProps> = ({ onClick }) =>
  (
    <Button
      variant="primary"
      className="create-team-button float-right"
      onClick={onClick}>
      + New team
    </Button>
  );

export default CreateButton;
