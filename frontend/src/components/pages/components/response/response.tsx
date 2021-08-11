import Avatar from 'react-avatar';
import { ListGroup } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import { replaceIdParam } from 'helpers/helpers';
import { useHistory } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  userId: string;
  name: string;
  avatar: string;
  text: string;
};

export const Response: React.FC<Props> = ({ userId, name, avatar, text }) => {
  const history = useHistory();

  const handleAvatarClick = (userId?: string): void => {
    if (!userId) {
      return;
    }

    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <ListGroup.Item className="d-flex border-0 p-0 mt-3">
      <div className="pe-2">
        <Avatar
          size="30"
          name={name}
          src={avatar}
          round
          className="me-2"
          onClick={(): void => handleAvatarClick(userId)}
        />
      </div>
      <div>
        <p className={getAllowedClasses(' text-secondary', styles.text)}>
          <span className={getAllowedClasses('text-body', styles.userName)}>
            {name}
          </span>
          : {text}
        </p>
      </div>
    </ListGroup.Item>
  );
};