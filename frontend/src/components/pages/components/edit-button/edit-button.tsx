import Button from 'react-bootstrap/Button';

interface Props {
  onClick(): void;
}

export const EditButton: React.FC<Props> = ({ onClick }) => (
  <Button
    variant="primary"
    className="edit-button float-right"
    onClick={onClick}
  >
    Edit page
  </Button>
);
