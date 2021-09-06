import { Card, Button } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  onClick(): void;
};

export const CreateButton: React.FC<Props> = ({ onClick }) => (
  <Card className="rounded bg-white border-0 p-0">
    <Button
      variant="light"
      className={getAllowedClasses(
        styles.createButton,
        'bg-white d-flex align-items-center justify-content-center h-100',
      )}
      onClick={onClick}
    >
      <span className="bi bi-plus-lg" />
    </Button>
  </Card>
);
