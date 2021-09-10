import { Card, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { IPageContributor } from 'common/interfaces/pages';
import { AppRoute } from 'common/enums';
import { UserAvatar } from 'components/common/common';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';

interface IPageContributorsProps {
  className?: string;
  contributors: IPageContributor[];
  avatarSize?: number;
}

const DEFAULT_AVATAR_SIZE = 40;

export const PageContributors: React.FC<IPageContributorsProps> = ({
  contributors,
  avatarSize = DEFAULT_AVATAR_SIZE,
  className,
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
        Contributors
        <Badge className={styles.badge} pill={true}>
          {contributors.length}
        </Badge>
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody)}>
        {contributors ? (
          <div
            className="d-flex justify-content-start flex-wrap"
            style={{ marginLeft: +avatarSize / 2 }}
          >
            {contributors.map(({ id, fullName, avatar }) => (
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
          <span className="text-warning">no contributors</span>
        )}
      </Card.Body>
    </Card>
  );
};
