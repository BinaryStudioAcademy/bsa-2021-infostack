import { Card, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppRoute } from 'common/enums';
import { UserAvatar } from 'components/common/common';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';
import { IUser } from 'common/interfaces/user';

interface IPageContributorsProps {
  className?: string;
  avatarSize?: number;
  followers: IUser[] | undefined;
}

const DEFAULT_AVATAR_SIZE = 40;

export const PageFollowingUsers: React.FC<IPageContributorsProps> = ({
  avatarSize = DEFAULT_AVATAR_SIZE,
  className,
  followers,
}) => {
  const history = useHistory();

  const avatarWrapperStyle: React.CSSProperties = {
    marginLeft: -(+avatarSize / 2.2) + 'px',
  };

  const avatarStyles: React.CSSProperties = {
    boxSizing: 'content-box',
    cursor: 'pointer',
  };

  const handleAvatarClick = (userId: string): void => {
    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <Card border="light" className={getAllowedClasses(styles.card, className)}>
      <Card.Header className="bg-white border-0 d-flex align-items-center">
        Followers
        <Badge className={styles.badge} pill={true}>
          {followers ? followers.length : 0}
        </Badge>
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody)}>
        {followers ? (
          <div
            className="d-flex justify-content-start flex-wrap"
            style={{ marginLeft: +avatarSize / 2 }}
          >
            {followers.map(({ id, fullName, avatar }) => (
              <div key={id} style={avatarWrapperStyle}>
                <UserAvatar
                  style={avatarStyles}
                  name={fullName}
                  src={avatar}
                  round={true}
                  size={avatarSize.toString()}
                  onClick={handleAvatarClick.bind(null, id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-warning">no followers</span>
        )}
      </Card.Body>
    </Card>
  );
};
