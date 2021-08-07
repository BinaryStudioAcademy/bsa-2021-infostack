import { IWorkspace } from 'common/interfaces/workspace';
import { Button, Card } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  workspace: IWorkspace;
  onClick(id: string): void;
};

export const Item: React.FC<Props> = ({ workspace, onClick }) =>
  <Card className="shadow-sm rounded border-0">
    <Button
      variant="light"
      className="bg-white h-100"
      onClick={(): void => onClick(workspace.id)}>
      <Card.Body className="d-flex align-items-center justify-content-center">
        <Card.Title className={getAllowedClasses(styles.workspaceTitle)}>{ workspace.title }</Card.Title>
      </Card.Body>
    </Button>
  </Card>;
