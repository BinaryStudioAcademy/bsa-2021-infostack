import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  MentionsInput,
  Mention,
  OnChangeHandlerFunc,
  MentionItem,
} from 'react-mentions';

import { useState, useAppSelector, useAppDispatch } from 'hooks/hooks';
import { RequestStatus } from 'common/enums';
import { UserAvatar, Spinner } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import { commentsActions } from 'store/comments';
import { RecordVoice } from '../comment-record-voice/comment-record-voice';
import { commentApi } from 'services';
import styles from './styles.module.scss';

type Props = {
  pageId: string;
  parentCommentId?: string;
  className?: string;
  placeholder?: string;
  formState: { text: string; mentions: MentionItem[] };
  setFormState: React.Dispatch<
    React.SetStateAction<{
      text: string;
      mentions: MentionItem[];
    }>
  >;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export const CommentForm: React.FC<Props> = ({
  pageId,
  parentCommentId,
  className,
  placeholder,
  formState,
  setFormState,
  onSubmit,
  onCancel,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const { createStatus, fetchStatus, deleteStatus } = useAppSelector(
    (state) => state.comments,
  );
  const mentions = useAppSelector((state) =>
    state.users.users.map(({ id, fullName }) => ({ id, display: fullName })),
  );
  const dispatch = useAppDispatch();
  const [rawAudio, setRawAudio] = useState<File>();
  const [realAudioUrl, setRealAudioUrl] = useState<string>();
  const [isSpiner, setIsSpinner] = useState(false);

  const handleChange: OnChangeHandlerFunc = (_, text, __, mentions): void => {
    setFormState({
      text,
      mentions,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    const { text, mentions } = formState;
    const mentionIds = mentions.map((mention) => mention.id);

    if (rawAudio) {
      try {
        await commentApi
          .uploadAudioComment(rawAudio, pageId)
          .then((res) => res.url)
          .then((url) => {
            dispatch(
              commentsActions.createComment({
                pageId,
                payload: {
                  text,
                  mentionIds,
                  parentCommentId,
                  voiceRecord: url,
                },
              }),
            ).unwrap();
          });

        setFormState({
          text: '',
          mentions: [],
        });
        setRawAudio(undefined);
        setRealAudioUrl(undefined);
        onSubmit?.();
      } catch {
        toast.error('Could not add audio comment');
      }
    } else {
      try {
        await dispatch(
          commentsActions.createComment({
            pageId,
            payload: {
              text,
              mentionIds,
              parentCommentId,
              voiceRecord: realAudioUrl,
            },
          }),
        ).unwrap();

        setFormState({
          text: '',
          mentions: [],
        });
        setRawAudio(undefined);
        setRealAudioUrl(undefined);
        onSubmit?.();
      } catch {
        toast.error('Could not add comment');
      }
    }
  };

  const handleCancel = (): void => {
    setFormState({
      text: '',
      mentions: [],
    });
    setRawAudio(undefined);
    onCancel?.();
  };

  const isSubmitDisabled =
    createStatus === RequestStatus.LOADING ||
    fetchStatus === RequestStatus.LOADING ||
    deleteStatus === RequestStatus.LOADING;
  const isCancelDisabled = createStatus === RequestStatus.LOADING;
  const isFieldDisabled = isCancelDisabled;

  const completeRecord = (audioFile: File): void => {
    setIsSpinner(true);
    setRawAudio(audioFile);
    commentApi
      .transcriptAudioComment(audioFile)
      .then((res) => {
        setFormState({
          text: res.comment,
          mentions: [],
        });
      })
      .finally(() => setIsSpinner(false));
  };
  const { text } = formState;

  return (
    <>
      <Form className={className}>
        <Form.Group>
          <div
            className={`d-flex align-items-start ${
              isSpiner && 'justify-content-center'
            }`}
          >
            {isSpiner ? (
              <Spinner height={'6rem'} width={'6rem'} />
            ) : (
              <>
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
                  <div className={getAllowedClasses(styles.containerButtons)}>
                    <Button
                      disabled={isCancelDisabled}
                      onClick={handleCancel}
                      className={styles.text}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        isSubmitDisabled || (text.trim() === '' && !rawAudio)
                      }
                      onClick={handleSubmit}
                      className={getAllowedClasses('ms-2', styles.text)}
                      variant="success"
                    >
                      Comment{rawAudio && ' with audio'}
                    </Button>
                    <RecordVoice handleRecord={completeRecord} />
                  </div>
                </div>
              </>
            )}
          </div>
        </Form.Group>
      </Form>
    </>
  );
};
