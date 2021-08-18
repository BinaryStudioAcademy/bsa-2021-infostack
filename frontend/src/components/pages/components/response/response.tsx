import { ListGroup } from 'react-bootstrap';
import { replaceIdParam } from 'helpers/helpers';
import { useAppSelector, useHistory } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import { UserAvatar } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { commentsSelectors, IStoreComment } from 'store/comments/slice';

type Props = {
  id: string;
  // userId: string;
  // name: string;
  // avatar: string;
  // text: string;
};

export const Response: React.FC<Props> = ({ id }) => {
  const history = useHistory();
  const response = useAppSelector((state) =>
    commentsSelectors.selectById(state, id),
  ) as IStoreComment;

  const {
    text,
    author: { id: userId, fullName: name, avatar },
  } = response;
  const handleAvatarClick = (userId?: string): void => {
    if (!userId) {
      return;
    }

    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <ListGroup.Item className="d-flex border-0 p-0 mt-3">
      <div className="pe-2">
        <UserAvatar
          size="30"
          name={name}
          src={avatar}
          round
          onClick={(): void => handleAvatarClick(userId)}
        />
      </div>
      <div>
        <p className={getAllowedClasses('ms-2 text-secondary', styles.text)}>
          <span className={getAllowedClasses('text-body', styles.userName)}>
            {name}
          </span>
          : {text}
        </p>
      </div>
    </ListGroup.Item>
  );
};
