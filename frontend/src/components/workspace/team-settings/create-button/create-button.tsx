import Button from 'react-bootstrap/Button';
import './styles.scss';

interface Props {
  onClick(): void;
}

const CreateButton: React.FC<Props> = ({ onClick }) => (
  <Button
    variant="primary"
    className="create-team-button float-right"
    onClick={onClick}
  >
    <i className="bi bi-plus-lg text-white"></i>
    New team
  </Button>
);

export default CreateButton;
