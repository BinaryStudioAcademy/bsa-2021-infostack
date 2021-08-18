import { ListGroup } from 'react-bootstrap';
import {
  useState,
  useHistory,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import { CommentForm } from '../components';
import { UserAvatar } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { commentsSelectors } from 'store/comments/slice';
import { ICommentNormalized } from 'common/interfaces/comment';
import { commentsActions } from 'store/comments';

type Props = {
  id: string;
};

export const Comment: React.FC<Props> = ({ id }) => {
  const comment = useAppSelector((state) =>
    commentsSelectors.selectById(state, id),
  ) as ICommentNormalized;
  const dispatch = useAppDispatch();

  const {
    text,
    pageId,
    children,
    author: { id: userId, fullName: name, avatar },
  } = comment;

  const [isFieldVisible, setIsFieldVisible] = useState<boolean>(false);
  const history = useHistory();

  const toggleField = (): void => setIsFieldVisible((prev) => !prev);

  const handleResponse = (text: string): void => {
    dispatch(
      commentsActions.createComment({
        pageId,
        payload: { text, parentCommentId: id },
      }),
    );
  };

  const handleSubmit = (text: string): void => {
    handleResponse(text);
    toggleField();
  };

  const handleAvatarClick = (userId?: string): void => {
    if (!userId) {
      return;
    }

    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <ListGroup.Item
      className={getAllowedClasses('d-flex align-items-start', styles.comment)}
    >
      <UserAvatar
        size="40"
        name={name}
        src={avatar}
        round
        className={getAllowedClasses(styles.avatar)}
        onClick={(): void => handleAvatarClick(userId)}
      />
      <div className="w-100 ms-3">
        <p className={getAllowedClasses('mb-2', styles.userName)}>{name}</p>
        <p className={getAllowedClasses('text-secondary mb-0', styles.text)}>
          {text}
        </p>
        <button
          className={getAllowedClasses('text-secondary', styles.respond)}
          onClick={toggleField}
        >
          respond
        </button>
        {isFieldVisible && (
          <CommentForm
            className="mt-2"
            placeholder="Add a response"
            avatarSize="30"
            onSubmit={handleSubmit}
            onCancel={toggleField}
          />
        )}
        {children && (
          <ListGroup variant="flush">
            {children.map((id) => (
              <Comment
                key={id}
                id={id}
                // userId={userId}
                // name={fullName}
                // avatar={avatar}
                // text={text}
              />
            ))}
          </ListGroup>
        )}
      </div>
    </ListGroup.Item>
  );
};
