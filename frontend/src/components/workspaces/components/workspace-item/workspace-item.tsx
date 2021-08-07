import { IWorkspace } from 'common/interfaces/workspace';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './styles.scss';

interface IWorkspaceItemProps {
  workspace: IWorkspace;
  onClick( id: string ): void;
}

const WorkspaceItem: React.FC<IWorkspaceItemProps> = ({ workspace, onClick }) =>
  (
    <Card className="workspace-card shadow-sm rounded border-0">
      <Button
        variant="light"
        className="bg-white h-100"
        onClick={():void => onClick(workspace.id)}>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Title className="workspace-title">{ workspace.title }</Card.Title>
        </Card.Body>
      </Button>
    </Card>
  );

export default WorkspaceItem;
