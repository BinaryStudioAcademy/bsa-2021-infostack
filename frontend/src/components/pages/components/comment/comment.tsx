import Avatar from 'react-avatar';
import { ListGroup } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useState, useHistory } from 'hooks/hooks';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import { CommentForm } from '../comment-form/comment-form';
import styles from './styles.module.scss';

type Props = {
  userId: string;
  avatar: string;
  name: string;
  text: string;
  handleResponse: (text: string) => void;
  children?: JSX.Element[];
};

export const Comment: React.FC<Props> = ({
  userId,
  name,
  avatar,
  text,
  handleResponse,
  children,
}) => {
  const [isFieldVisible, setIsFieldVisible] = useState<boolean>(false);
  const history = useHistory();

  const toggleField = (): void => setIsFieldVisible((prev) => !prev);

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
    <ListGroup.Item className={getAllowedClasses('d-flex', styles.comment)}>
      <Avatar
        size="40"
        name={name}
        src={avatar}
        round
        className={getAllowedClasses('me-3', styles.avatar)}
        onClick={(): void => handleAvatarClick(userId)}
      />
      <div className="w-100">
        <p className={getAllowedClasses('mb-2', styles.userName)}>{name}</p>
        <p className={getAllowedClasses('text-secondary mb-0', styles.text)}>
          {text}
        </p>
        <button
          className={getAllowedClasses('text-secondary', styles.respond)}
          onClick={toggleField}
        >
          {isFieldVisible ? 'cancel' : 'respond'}
        </button>
        {isFieldVisible && (
          <CommentForm
            className="mt-2"
            placeholder="Add a response"
            avatarSize="30"
            onSubmit={handleSubmit}
          />
        )}
        {children && <ListGroup variant="flush">{children}</ListGroup>}
      </div>
    </ListGroup.Item>
  );
};
