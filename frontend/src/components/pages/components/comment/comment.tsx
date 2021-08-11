import Avatar from 'react-avatar';
import { ListGroup } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useState } from 'hooks/hooks';
import { CommentForm } from '../comment-form/comment-form';
import styles from './styles.module.scss';

type Props = {
  avatar: string;
  name: string;
  text: string;
  handleResponse: (text: string) => void;
  children?: JSX.Element[];
};

export const Comment: React.FC<Props> = ({ name, avatar, text, handleResponse, children }) => {
  const [isFieldVisible, setIsFieldVisible] = useState<boolean>(false);

  const toggleField = (): void =>
    setIsFieldVisible(prev => !prev);

  const handleSubmit = (text: string): void => {
    handleResponse(text);
    toggleField();
  };

  return (
    <ListGroup.Item className={getAllowedClasses('d-flex', styles.comment)}>
      <Avatar size="40" name={name} src={avatar} round className="me-3" />
      <div className="w-100">
        <p className={getAllowedClasses('mb-2', styles.userName)}>{name}</p>
        <p className={getAllowedClasses('text-secondary mb-0', styles.text)}>{text}</p>
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
        {children && (
          <ListGroup variant="flush">
            {children}
          </ListGroup>
        )}
      </div>
    </ListGroup.Item>
  );
};
