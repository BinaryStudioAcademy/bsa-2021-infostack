import { Card, Button } from 'react-bootstrap';

type Props = {
  onClick(): void;
};

export const CreateButton: React.FC<Props> = ({ onClick }) =>
  <Card className="shadow-sm rounded bg-white border-0">
    <Button
      variant="light"
      className="bg-white text-secondary d-flex align-items-center justify-content-center h-100"
      onClick={onClick}
    >
      <span className="bi bi-plus-lg" />
    </Button>
  </Card>;
