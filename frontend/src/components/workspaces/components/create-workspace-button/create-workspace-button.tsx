import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './styles.scss';

interface ICreateWorkspaceButtonProps {
  onClick(): void;
}

const CreateWorkspaceButton: React.FC<ICreateWorkspaceButtonProps> = ({ onClick }) => {
  return (
    <Card className="create-workspace-card border-0">
      <Button
        variant="light"
        className="create-workspace-button d-flex align-items-center justify-content-center h-100"
        onClick={onClick}>
        +
      </Button>
    </Card>
  );
};

export default CreateWorkspaceButton;
