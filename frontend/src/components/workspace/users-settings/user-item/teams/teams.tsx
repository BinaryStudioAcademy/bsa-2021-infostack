import { IWorkspaceUser } from 'common/interfaces/workspace/index';

interface ITeamsProps {
  teams: IWorkspaceUser['teams'];
}

const Teams: React.FC<ITeamsProps> = ({ teams }) => {
  return <td>{teams.length ? teams.join(', ') : 'No teams found'}</td>;
};

export { Teams };
