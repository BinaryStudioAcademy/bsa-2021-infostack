import { ITeam } from 'common/interfaces/team';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useAppSelector, useAppDispatch } from 'hooks/hooks';
import { teamsActions } from 'store/actions';
import { workspaceActions } from '../../../store/workspace';
import TeamItem from './team-item/team-item';
import CreateTeamButton from './create-team-button/create-team-button';

import './styles.scss';

const TeamSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.workspace.teams);

  const renderTeamItem = (team: ITeam): JSX.Element => {
    return <TeamItem key={team.id} team={team} onClick={ onTeamItemClick }/>;
  };

  const onTeamItemClick = (id: string): void => {
    dispatch(teamsActions.SetCurrentTeamID(id));
  };

  const onCreateTeamButtonClick = (): void => {
    console.info();
  };

  useEffect(() => {
    dispatch(workspaceActions.loadTeams());
  }, []);

  return (
    <div
      className={
        `teams text-secondary bg-light d-flex flex-column align-items-start p-4${!teams ? ' vh-91' : ''}`
      }>
      <div className="teams-container-header">
        <h1 className="pageTitle">Teams</h1>
        <CreateTeamButton onClick={onCreateTeamButtonClick}/>
      </div>
      {
        !teams && <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
          <Spinner animation="border" variant="secondary" />
        </div>
      }
      {
        teams && <div className="teams-container py-2 w-100">
          {teams.map((team: ITeam) => renderTeamItem(team))}
        </div>
      }
    </div>
  );
};

export default TeamSettings;
