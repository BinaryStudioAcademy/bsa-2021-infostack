import Avatar from 'react-avatar';
import { Form, Button } from 'react-bootstrap';
import { useState, useAppSelector, useHistory } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/dom';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (text: string) => void;
  isDisabled?: boolean;
  className?: string;
  placeholder?: string;
  avatarSize?: string;
};

export const CommentForm: React.FC<Props> = ({
  onSubmit,
  isDisabled = false,
  className,
  placeholder,
  avatarSize = '40',
}) => {
  const [text, setText] = useState('');
  const user = useAppSelector((state) => state.auth.user);
  const history = useHistory();

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => setText(value);

  const handleSubmit = (): void => {
    onSubmit(text);
    setText('');
  };

  const handleAvatarClick = (userId?: string): void => {
    if (!userId) {
      return;
    }

    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <>
      <Form className={className}>
        <Form.Group>
          <div className="d-flex">
            <Avatar
              size={avatarSize}
              name={user?.fullName}
              src={user?.avatar}
              round
              className={getAllowedClasses('me-3', styles.avatar)}
              onClick={(): void => handleAvatarClick(user?.id)}
            />
            <div className="flex-grow-1">
              <Form.Control
                as="textarea"
                placeholder={placeholder}
                value={text}
                className={getAllowedClasses('mb-2', styles.text)}
                onChange={handleChange}
              />
              <Button
                disabled={isDisabled}
                onClick={handleSubmit}
                className={styles.text}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};
