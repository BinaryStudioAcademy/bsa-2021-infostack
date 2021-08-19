import { Spinner, Card } from 'react-bootstrap';
import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { teamsActions } from 'store/teams';
import { Item, CreateButton } from './components/components';
import { CreateTeamModal } from './components/modal/modal';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const TeamSettings: React.FC = () => {
  const { teams } = useAppSelector((state) => state.teams);

  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  useEffect(() => {
    dispatch(teamsActions.fetchTeams());
  }, []);

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
    <Card className={getAllowedClasses(styles.cardItem)}>
      <Card.Header
        className={getAllowedClasses(
          styles.cardHeader,
          'd-flex justify-content-between',
        )}
      >
        <Card.Title as="h5" className={getAllowedClasses(styles.cardTitle)}>
          Teams
        </Card.Title>
        <CreateButton onClick={onCreateTeamButtonClick} />
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody)}>
        <div
          className={`text-secondary d-flex flex-column align-items-start p-4${
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
              <div
                className={getAllowedClasses(
                  styles.teamsContainer,
                  'py-2 w-100',
                )}
              >
                {teams.map((team: ITeam) => renderTeamItem(team))}
              </div>
            ))}
          <CreateTeamModal
            showModal={isPopUpVisible}
            onModalClose={handleCreationCancel}
            handleFunction={handleCreation}
            inputValue=""
          />
        </div>
      </Card.Body>
    </Card>
  );
};
