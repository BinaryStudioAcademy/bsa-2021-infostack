import { Card, Badge } from 'react-bootstrap';
import { IPageContributor } from 'common/interfaces/pages';
import { useHistory } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';
import { replaceIdParam } from 'helpers/helpers';
import UserAvatar from '../../../common/avatar/avatar';

interface IPageContributorsProps {
  contributors: IPageContributor[];
  avatarSize?: number;
}

const DEFAULT_AVATAR_SIZE = 40;

const PageContributors: React.FC<IPageContributorsProps> = ({
  contributors,
  avatarSize = DEFAULT_AVATAR_SIZE,
}) => {
  const history = useHistory();

  const avatarWrapperStyle: React.CSSProperties = {
    marginLeft: -(+avatarSize / 2.2) + 'px',
  };

  const avatarStyles: React.CSSProperties = {
    boxSizing: 'content-box',
    border: '4px solid white',
    cursor: 'pointer',
  };

  const handleAvatarClick = (userId: string): void => {
    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <Card border="light" className={styles.card}>
      <Card.Header className="bg-white border-0 d-flex align-items-center">
        Contributors
        <Badge className={styles.badge} pill={true}>
          {contributors.length}
        </Badge>
      </Card.Header>
      <Card.Body>
        <div
          className="d-flex justify-content-start"
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
      </Card.Body>
    </Card>
  );
};

export default PageContributors;
