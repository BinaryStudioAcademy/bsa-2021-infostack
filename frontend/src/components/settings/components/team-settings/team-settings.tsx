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
import { RoleType } from 'common/enums/enums';

export const TeamSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const { teams } = useAppSelector((state) => state.teams);
  const { userTeams } = useAppSelector((state) => state.teams);
  const userId = useAppSelector((state) => state.auth?.user?.id);
  const userRole = useAppSelector(
    (state) => state.workspaces?.currentWorkspace?.role,
  );

  const teamsToRender = [];
  for (let i = 0; i < teams.length; i++) {
    if (userTeams.find((team) => teams[i].id === team.id)) {
      teamsToRender.push(teams[i]);
    }
  }

  useEffect(() => {
    if (userId) {
      dispatch(teamsActions.fetchTeamsForUser(userId));
    } else {
      dispatch(teamsActions.fetchTeams());
    }
  }, [userRole, teams]);

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
                  'd-flex flex-wrap py-2 w-100',
                )}
              >
                {userRole === RoleType.ADMIN
                  ? teams.map((team: ITeam) => (
                      <Item key={team.id} team={team} />
                    ))
                  : teamsToRender.map((team: ITeam) => (
                      <Item key={team.id} team={team} />
                    ))}
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
