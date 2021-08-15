import { Spinner, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { teamsActions } from 'store/teams';
import Item from './item/item';
import CreateButton from './create-button/create-button';
import { Popup } from './popup/popup';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';

import './styles.scss';

const TeamSettings: React.FC = () => {
  const { teams, error } = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  useEffect(() => {
    dispatch(teamsActions.loadTeams());
  }, []);

  useEffect(() => {
    if (error) {
      toast.info(error);
      dispatch(teamsActions.removeConflictError());
    }
  }, [error]);

  const renderTeamItem = (team: ITeam): JSX.Element => {
    return <Item key={team.id} team={team} />;
  };

  const onCreateTeamButtonClick = (): void => {
    setIsPopUpVisible(true);
  };

  const handleCreationCancel = (): void => {
    setIsPopUpVisible(false);
  };

  const handleCreation = async (data: ITeamCreation): Promise<void> => {
    dispatch(teamsActions.createTeam(data.name));
  };

  return (
    <Card className="cardItem">
      <Card.Header className="cardHeader d-flex justify-content-between">
        <Card.Title as="h5" className="cardTitle">
          Teams
        </Card.Title>
        <CreateButton onClick={onCreateTeamButtonClick} />
      </Card.Header>
      <Card.Body className="cardBody">
        <div
          className={`teams text-secondary d-flex flex-column align-items-start p-4${
            !teams ? ' vh-91' : ''
          }`}
        >
          {!teams && (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
              <Spinner animation="border" variant="secondary" />
            </div>
          )}
          {teams &&
            (teams.length === 0 ? (
              <div>There is no teams in this workspace. Start adding</div>
            ) : (
              <div className="teams-container py-2 w-100">
                {teams.map((team: ITeam) => renderTeamItem(team))}
              </div>
            ))}
          <Popup
            title="Enter name of team:"
            showPopup={isPopUpVisible}
            onPopupClose={handleCreationCancel}
            handleFunction={handleCreation}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TeamSettings;
