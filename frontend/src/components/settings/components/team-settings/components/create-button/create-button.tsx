import Button from 'react-bootstrap/Button';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  onClick(): void;
};

export const CreateButton: React.FC<Props> = ({ onClick }) => (
  <Button
    variant="success"
    className={getAllowedClasses(styles.createTeamButton, 'float-right')}
    onClick={onClick}
  >
    <i className="bi bi-plus-lg text-white"></i>
    New team
  </Button>
);
