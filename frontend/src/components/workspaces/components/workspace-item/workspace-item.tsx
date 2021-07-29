import { IWorkspaceCreation } from 'common/interfaces/workspace';
import Card from 'react-bootstrap/Card';
import './styles.scss';

const WorkspaceItem: React.FC<IWorkspaceCreation> = ({ title }) =>
  (
    <Card className="workspace-card border-0">
      <Card.Body className="d-flex align-items-center justify-content-center">
        <Card.Title>{ title }</Card.Title>
      </Card.Body>
    </Card>
  );

export default WorkspaceItem;
