import { Card } from 'react-bootstrap';
import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { teamsActions } from 'store/teams';
import { Spinner } from 'components/common/common';
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
  const dispatch = useAppDispatch();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isUserTeamsMapped, setUserTeamsMapped] = useState(false);
  const { teams } = useAppSelector((state) => state.teams);
  const { userTeams } = useAppSelector((state) => state.teams);
  const userId = useAppSelector((state) => state.auth?.user?.id as string);

  useEffect(() => {
    if (userId) {
      dispatch(teamsActions.fetchTeamsForUser(userId));
      setUserTeamsMapped(true);
    }
    dispatch(teamsActions.fetchTeams());
  }, [userId]);

  const teamsToRender = [];
  for (let i = 0; i < teams.length; i++) {
    if (userTeams.find((team) => teams[i].id === team.id)) {
      teamsToRender.push(teams[i]);
    }
  }

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
            !userTeams ? ' vh-91' : ''
          }`}
        >
          {!userTeams ||
            (!isUserTeamsMapped && (
              <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
                <Spinner height={'6rem'} width={'6rem'} />
              </div>
            ))}
          {userTeams && userTeams.length === 0 ? (
            <span className={getAllowedClasses(styles.emptyMessage)}>
              There are no teams in this workspace. Start adding
            </span>
          ) : (
            <div
              className={getAllowedClasses(
                styles.teamsContainer,
                'd-flex flex-wrap py-2 w-100',
              )}
            >
              {teamsToRender.map((team: ITeam) => (
                <Item key={team.id} team={team} userId={userId} />
              ))}
            </div>
          )}
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
