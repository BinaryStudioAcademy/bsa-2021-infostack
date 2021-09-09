import { Card } from 'react-bootstrap';

import { ITeam } from 'common/interfaces';
import { DropDown } from '..';
import { UserAvatar } from 'components/common/avatar/avatar';
import { getAllowedClasses } from 'helpers';

import styles from './styles.module.scss';

export const Item: React.FC<{ team: ITeam; userId: string }> = ({
  userId,
  team,
  team: { name, users, owner },
}) => {
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
            />
          ))}
      </Card.Body>
    </Card>
  );
};
