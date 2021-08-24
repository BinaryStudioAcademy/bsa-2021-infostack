import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MentionsInput, Mention, OnChangeHandlerFunc } from 'react-mentions';

import { useState, useAppSelector, useAppDispatch } from 'hooks/hooks';
import { RequestStatus } from 'common/enums/enums';
import { UserAvatar } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import { commentsActions } from 'store/comments';

import styles from './styles.module.scss';

type Props = {
  pageId: string;
  parentCommentId?: string;
  className?: string;
  placeholder?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export const CommentForm: React.FC<Props> = ({
  pageId,
  parentCommentId,
  className,
  placeholder,
  onSubmit,
  onCancel,
}) => {
  const [text, setText] = useState('');
  const user = useAppSelector((state) => state.auth.user);
  const { createStatus, fetchStatus, deleteStatus } = useAppSelector(
    (state) => state.comments,
  );
  const mentions = useAppSelector((state) =>
    state.users.users.map(({ id, fullName }) => ({ id, display: fullName })),
  );
  const dispatch = useAppDispatch();

  const handleChange: OnChangeHandlerFunc = ({ target: { value } }): void =>
    setText(value);

  const handleSubmit = async (): Promise<void> => {
    try {
      await dispatch(
        commentsActions.createComment({
          pageId,
          payload: { text, parentCommentId },
        }),
      ).unwrap();
      setText('');
      onSubmit?.();
    } catch {
      toast.error('Could not add comment');
    }
  };

  const handleCancel = (): void => {
    setText('');
    onCancel?.();
  };

  const isSubmitDisabled =
    createStatus === RequestStatus.LOADING ||
    fetchStatus === RequestStatus.LOADING ||
    deleteStatus === RequestStatus.LOADING;
  const isCancelDisabled = createStatus === RequestStatus.LOADING;
  const isFieldDisabled = isCancelDisabled;

  return (
    <>
      <Form className={className}>
        <Form.Group>
          <div className="d-flex align-items-start">
            <UserAvatar
              size="40"
              name={user?.fullName}
              src={user?.avatar}
              round
              className={getAllowedClasses(styles.avatar)}
            />
            <div className="flex-grow-1 ms-3">
              <MentionsInput
                disabled={isFieldDisabled}
                placeholder={placeholder}
                value={text}
                className="mentions"
                classNames={styles}
                onChange={handleChange}
              >
                <Mention
                  trigger="@"
                  data={mentions}
                  style={{
                    backgroundColor: 'rgb(63 128 234 / 0.25)',
                    color: 'rgb(63 128 234)',
                  }}
                  displayTransform={(_, display): string => `@${display}`}
                />
              </MentionsInput>
              <Button
                disabled={isCancelDisabled}
                onClick={handleCancel}
                className={styles.text}
                variant="warning"
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitDisabled || text.trim() === ''}
                onClick={handleSubmit}
                className={getAllowedClasses('ms-2', styles.text)}
                variant="success"
              >
                Comment
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};
