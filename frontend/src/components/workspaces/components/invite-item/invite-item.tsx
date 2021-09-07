import { IWorkspace } from 'common/interfaces/workspace';
import { Button, Card } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  workspace: IWorkspace;
  onClickAccept(id: string): void;
  onClickDecline(id: string): void;
};

export const InviteItem: React.FC<Props> = ({
  workspace,
  onClickAccept,
  onClickDecline,
}) => (
  <Card className="d-flex shadow-sm rounded border-0">
    <Card.Body className="d-flex align-items-center justify-content-around flex-column">
      <Card.Title className={getAllowedClasses(styles.workspaceInviteTitle)}>
        {workspace.title}
      </Card.Title>
      <div className="d-flex w-100 mt-5 align-items-center justify-content-around">
        <Button
          onClick={(): void => onClickAccept(workspace.id)}
          variant="success"
        >
          Accept
        </Button>
        <Button
          onClick={(): void => onClickDecline(workspace.id)}
          variant="secondary"
        >
          Decline
        </Button>
      </div>
    </Card.Body>
  </Card>
);
