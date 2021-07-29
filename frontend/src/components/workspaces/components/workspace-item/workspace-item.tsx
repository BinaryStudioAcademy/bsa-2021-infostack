import Card from 'react-bootstrap/Card';
import './styles.scss';

interface IWorkspaceItemProps {
  title: string;
  description?: string;
}

const WorkspaceItem: React.FC<IWorkspaceItemProps> = ({ title }) =>
  (<Card className="workspace-card border-0">
    <Card.Body className="d-flex align-items-center justify-content-center">
      <Card.Title>{ title }</Card.Title>
    </Card.Body>
  </Card>);

export default WorkspaceItem;
