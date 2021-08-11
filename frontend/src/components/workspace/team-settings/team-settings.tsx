import { Spinner, Card } from 'react-bootstrap';
import { ITeam } from 'common/interfaces/team';
import { teamsActions } from 'store/teams';
import Item from './item/item';
import CreateButton from './create-button/create-button';
import { Popup } from '../../common/popup/popup';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';

import './styles.scss';

const TeamSettings: React.FC = () => {
  const { teams, creatingError } = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  useEffect(() => {
    dispatch(teamsActions.loadTeams());
  }, []);

  const renderTeamItem = (team: ITeam): JSX.Element => {
    return <Item key={team.id} team={team} onClick={onItemClick} />;
  };

  const onItemClick = (id: string): void => {
    dispatch(teamsActions.loadTeam(id));
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
      dispatch(teamsActions.createTeam(popUpText));
    }
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
          {teams && (
            <div className="teams-container py-2 w-100">
              {teams.map((team: ITeam) => renderTeamItem(team))}
            </div>
          )}
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
      </Card.Body>
    </Card>
  );
};

export default TeamSettings;
