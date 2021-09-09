import { Collapse, ListGroup } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { MentionItem } from 'react-mentions';
import { isThisMinute } from 'date-fns/esm';
import AudioPlayer from 'react-h5-audio-player';
import { useState, useHistory, useAppSelector } from 'hooks/hooks';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums';
import { UserAvatar } from 'components/common/common';
import { ICommentNormalized } from 'common/interfaces/comment';
import { TimeAgo } from 'components/common/time-ago/time-ago';
import { commentsSelectors } from 'store/comments/slice';
import { CommentForm } from '../comment-form/comment-form';
import { Emoji } from '../emoji/emoji';
import styles from './styles.module.scss';
import { parseMentions } from 'helpers/parse-mentions.helper';

type Props = {
  id: string;
  handleDelete: (id: string) => void;
};

export const Comment: React.FC<Props> = ({ id, handleDelete }) => {
  const comment = useAppSelector((state) =>
    commentsSelectors.selectById(state, id),
  ) as ICommentNormalized;
  const user = useAppSelector((state) => state.auth.user);

  const {
    text,
    pageId,
    children,
    createdAt,
    author: { id: authorId, fullName: name, avatar },
    voiceRecord,
    reactions,
  } = comment;

  const [isFieldVisible, setIsFieldVisible] = useState<boolean>(false);
  const history = useHistory();

  const [formState, setFormState] = useState<{
    text: string;
    mentions: MentionItem[];
  }>({
    text: '',
    mentions: [],
  });

  const avatarStyles: React.CSSProperties = {
    cursor: 'pointer',
  };

  const toggleField = (): void => setIsFieldVisible((prev) => !prev);

  const handleAvatarClick = (userId?: string): void => {
    if (!userId) {
      return;
    }

    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  const isOwnComment = user?.id === authorId;
  const isAnimated = isThisMinute(new Date(createdAt));

  const content = parseMentions(text);

  return (
    <Collapse in appear={isAnimated}>
      <div className={styles.comment}>
        <UserAvatar
          size="40"
          style={avatarStyles}
          name={name}
          src={avatar}
          round
          className={styles.avatar}
          onClick={(): void => handleAvatarClick(authorId)}
        />
        <div className={styles.content}>
          <span className={styles.author}>{name}</span>
          <span className={styles.metadata}>
            <TimeAgo timestamp={createdAt} />
          </span>
          <div className={styles.text}>
            {content.map((item) => {
              const isQuote = typeof item === 'string' && item.startsWith('>');

              if (isQuote) {
                return <ReactMarkdown>{item as string}</ReactMarkdown>;
              }

              return item;
            })}
          </div>
          {voiceRecord && (
            <div className={styles.audioWrapper}>
              <AudioPlayer
                src={voiceRecord as string}
                layout="horizontal-reverse"
                customAdditionalControls={[]}
                showJumpControls={false}
                preload="metadata"
                timeFormat="mm:ss"
              />
            </div>
          )}
          <div className={styles.actions}>
            <a className={styles.action} onClick={toggleField}>
              reply
            </a>{' '}
            {isOwnComment && (
              <a
                className={styles.action}
                onClick={(): void => handleDelete(id)}
              >
                delete
              </a>
            )}
            <Emoji reactions={reactions} commentId={id} />
          </div>
          {isFieldVisible && (
            <CommentForm
              pageId={pageId}
              parentCommentId={id}
              className="mt-2"
              placeholder="Add a reply"
              onSubmit={toggleField}
              onCancel={toggleField}
              formState={formState}
              setFormState={setFormState}
            />
          )}
          {children && (
            <ListGroup variant="flush" className="w-100 mw-100">
              {children.map((id) => (
                <Comment key={id} id={id} handleDelete={handleDelete} />
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </Collapse>
  );
};
