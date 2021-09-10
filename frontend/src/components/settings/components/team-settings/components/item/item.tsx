import { Card } from 'react-bootstrap';
import { useHistory } from 'hooks/hooks';
import { ITeam } from 'common/interfaces/team';
import { AppRoute } from 'common/enums';
import { DropDown } from '../components';
import { UserAvatar } from 'components/common/avatar/avatar';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';

export const Item: React.FC<{ team: ITeam; userId: string }> = ({
  userId,
  team,
  team: { name, users, owner },
}) => {
  const history = useHistory();

  const handleAvatarClick = (
    _event: React.SyntheticEvent<Element, Event>,
    userId: string,
  ): void => {
    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <Card
      className={getAllowedClasses(
        styles.teamCard,
        'shadow rounded border-0 p-2',
      )}
    >
      <Card.Title
        className={getAllowedClasses(
          styles.teamName,
          'd-flex justify-content-between m-0 p-3',
        )}
      >
        {name}
        {userId === owner ? <DropDown team={team} /> : null}
      </Card.Title>
      <Card.Body className="d-flex flex-wrap card-body">
        {users &&
          users.map(({ id, fullName, avatar }) => (
            <UserAvatar
              key={id}
              size="40"
              name={fullName}
              src={avatar}
              round={true}
              className={getAllowedClasses(styles.userAvatar)}
              onClick={(event): void => handleAvatarClick(event, id)}
            />
          ))}
      </Card.Body>
    </Card>
  );
};
