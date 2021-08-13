import { Card, Badge } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { IPageContributor } from 'common/interfaces/pages';
import { useHistory } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';
import { replaceIdParam } from 'helpers/helpers';
import { getAllowedClasses } from 'helpers/dom/dom';

interface IPageContributorsProps {
  className?: string;
  contributors: IPageContributor[];
  avatarSize?: number;
}

const DEFAULT_AVATAR_SIZE = 40;

const PageContributors: React.FC<IPageContributorsProps> = ({
  contributors,
  avatarSize = DEFAULT_AVATAR_SIZE,
  className,
}) => {
  const history = useHistory();

  const avatarStyles: React.CSSProperties = {
    boxSizing: 'content-box',
    border: '4px solid white',
    marginLeft: -(+avatarSize / 2.2) + 'px',
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
      <Card.Body>
        <div style={{ marginLeft: +avatarSize / 2 }}>
          {contributors.map(({ id, fullName, avatar }) => (
            <Avatar
              style={avatarStyles}
              key={id}
              name={fullName}
              src={avatar}
              round={true}
              size={avatarSize.toString()}
              onClick={handleAvatarClick.bind(null, id)}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PageContributors;
