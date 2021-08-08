import { ITeam } from 'common/interfaces/team';
import Spinner from 'react-bootstrap/Spinner';
import { teamsActions } from 'store/teams';
import TeamItem from './team-item/team-item';
import CreateTeamButton from './create-team-button/create-team-button';
import { Popup } from '../../common/popup/popup';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';

import './styles.scss';

const TeamSettings: React.FC = () => {
  const { teams, creatingError } = useAppSelector((state) => state.teamSettings);
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  useEffect(() => {
    dispatch(teamsActions.loadTeams());
  }, []);

  const renderTeamItem = (team: ITeam): JSX.Element => {
    return <TeamItem key={team.id} team={team} onClick={ onTeamItemClick }/>;
  };

  const onTeamItemClick = (id: string): void => {
    dispatch(teamsActions.setCurrentTeamID(id));
  };

  const onCreateTeamButtonClick = (): void => {
    setIsPopUpVisible(true);
  };

  const handleCreationCancel = (): void => {
    setIsPopUpVisible(false);
    setPopUpText('');
  };

  const handleCreationConfirm = (): void => {
    if (popUpText) {
      dispatch(teamsActions.createTeam({ name: popUpText }));
    }
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
      <Popup
        query="Enter name of team:"
        isVisible={isPopUpVisible}
        inputValue={popUpText}
        setPopUpText={setPopUpText}
        error={creatingError}
        cancelButton={{
          text: 'Cancel',
          onClick: handleCreationCancel,
        }}
        confirmButton={{
          text: 'Save',
          onClick: handleCreationConfirm,
          disabled: !popUpText,
        }}
      />
    </div>
  );
};

export default TeamSettings;
