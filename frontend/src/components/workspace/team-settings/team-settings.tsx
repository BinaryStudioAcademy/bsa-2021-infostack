import { ITeam } from 'common/interfaces/team';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect, useAppSelector, useAppDispatch } from 'hooks/hooks';
import { settingsActions } from 'store/settings';
import TeamItem from './team-item/team-item';
import CreateTeamButton from './create-team-button/create-team-button';
import PopUp from './create-team-popup/create-team-popup';

import './styles.scss';

const TeamSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.settings.teams);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  useEffect(() => {
    dispatch(settingsActions.loadTeams());
  }, []);

  const renderTeamItem = (team: ITeam): JSX.Element => {
    return <TeamItem key={team.id} team={team} onClick={ onTeamItemClick }/>;
  };

  const onTeamItemClick = (id: string): void => {
    dispatch(settingsActions.SetCurrentTeamID(id));
  };

  const onCreateTeamButtonClick = (): void => {
    setIsPopUpVisible(true);
  };

  const onCancelCreationTeam = (): void => {
    setIsPopUpVisible(false);
    setPopUpText('');
  };

  const onConfirmCreationTeam = (): void => {
    onCancelCreationTeam();
    dispatch(settingsActions.createTeam({ name: popUpText }));
  };

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
      <PopUp
        query="Enter name of team:"
        isVisible={isPopUpVisible}
        inputValue={popUpText}
        setPopUpText={setPopUpText}
        cancelButton={{
          text: 'Cancel',
          onClick: onCancelCreationTeam,
        }}
        confirmButton={{
          text: 'Save',
          onClick: onConfirmCreationTeam,
        }}
      />
    </div>
  );
};

export default TeamSettings;
