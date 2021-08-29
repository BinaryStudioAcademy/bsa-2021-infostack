import { CreateButton, Item, InviteItem } from '../components';
import { IWorkspace } from 'common/interfaces/workspace';
import { InviteStatus } from 'common/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  workspaces: IWorkspace[];
  onItemClick: (id: string) => void;
  onClickAccept: (id: string) => void;
  onClickDecline: (id: string) => void;
  onCreate: () => void;
};

export const Container: React.FC<Props> = ({
  workspaces,
  onItemClick,
  onCreate,
  onClickAccept,
  onClickDecline,
}) => (
  <div className={getAllowedClasses(styles.workspacesContainer, 'py-2 w-100')}>
    {workspaces.map((workspace: IWorkspace) =>
      workspace.status === InviteStatus.PENDING ? (
        <InviteItem
          key={workspace.id}
          workspace={workspace}
          onClickAccept={onClickAccept}
          onClickDecline={onClickDecline}
        />
      ) : (
        <Item key={workspace.id} workspace={workspace} onClick={onItemClick} />
      ),
    )}
    <CreateButton onClick={onCreate} />
  </div>
);
