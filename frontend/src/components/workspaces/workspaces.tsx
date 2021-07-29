import { IWorkspace } from 'common/interfaces/workspace';
import WorkspaceItem from './components/workspace-item/workspace-item';
import CreateWorkspaceButton from './components/create-workspace-button/create-workspace-button';
import './styles.scss';

const workspaces = [
  {
    id: '1',
    title: 'title',
    description: 'description',
  },
  {
    id: '2',
    title: 'title',
  },
  {
    id: '3',
    title: 'title',
    description: 'description',
  },
  {
    id: '4',
    title: 'title',
    description: 'description',
  },
  {
    id: '5',
    title: 'title',
  },
  {
    id: '6',
    title: 'title',
  },
  {
    id: '7',
    title: 'title',
    description: 'description',
  },
  {
    id: '8',
    title: 'title',
  },
  {
    id: '9',
    title: 'title',
    description: 'description',
  },
  {
    id: '10',
    title: 'title',
  },
  {
    id: '11',
    title: 'title',
    description: 'description',
  },
  {
    id: '12',
    title: 'title',
  },
  {
    id: '13',
    title: 'title',
    description: 'description',
  },
  {
    id: '14',
    title: 'title',
    description: 'description',
  },
  {
    id: '15',
    title: 'title',
  },
  {
    id: '16',
    title: 'title',
    description: 'description',
  },
  {
    id: '17',
    title: 'title',
    description: 'description',
  },
];

const Workspaces: React.FC = () => {
  const renderWorkspaceItem = ({ id, title, description }: IWorkspace): JSX.Element => {
    return <WorkspaceItem key={id} title={title} description={description} />;
  };

  return (
    <div className="workspaces d-flex flex-column align-items-start p-4">
      <h1 className="pageTitle">Workspaces</h1>
      <div className ="workspaces-container py-2 w-100">
        {workspaces.map(workspace => renderWorkspaceItem(workspace))}
        <CreateWorkspaceButton onClick={(): void => { return; }}/>
      </div>
    </div>
  );
};

export default Workspaces;
