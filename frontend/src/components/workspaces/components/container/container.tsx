import { CreateButton } from '../create-button/create-button';
import { Item } from '../item/item';
import { IWorkspace } from 'common/interfaces/workspace';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  workspaces: IWorkspace[];
  onItemClick: (id: string) => void;
  onCreate: () => void;
};

export const Container: React.FC<Props> = ({ workspaces, onItemClick, onCreate }) =>
  <div className={getAllowedClasses(styles.workspacesContainer, 'py-2 w-100')}>
    {workspaces.map((workspace: IWorkspace) => (
      <Item
        key={workspace.id}
        workspace={workspace}
        onClick={onItemClick}
      />
    ))}
    <CreateButton onClick={onCreate} />
  </div>;
