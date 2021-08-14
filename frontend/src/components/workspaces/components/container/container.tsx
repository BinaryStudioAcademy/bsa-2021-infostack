import { CreateButton } from '../create-button/create-button';
import { Item } from '../item/item';
import { IWorkspace } from 'common/interfaces/workspace';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import { InviteStatus } from 'infostack-shared';
import { InviteItem } from 'components/workspaces/components/invite-item/invite-item';

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
