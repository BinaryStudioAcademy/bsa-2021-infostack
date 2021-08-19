import { Card } from 'react-bootstrap';
import {
  useAppDispatch,
  useAppSelector,
  useContext,
  useEffect,
  useState,
} from 'hooks/hooks';
import { SocketContext } from 'context/socket';
import { commentsActions } from 'store/actions';
import { selectRootIds } from 'store/comments/slice';
import { IComment } from 'common/interfaces/comment';
import { SocketEvents } from 'common/enums/enums';
import { Comment, CommentForm } from '../components';

import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';

type Props = {
  pageId: string;
};

export const CommentSection: React.FC<Props> = ({ pageId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const comments = useAppSelector(selectRootIds);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const onComment = (comment: IComment): void => {
    if (comment.author.id !== user?.id) {
      dispatch(commentsActions.addComment(comment));
    }
  };

  useEffect(() => {
    dispatch(commentsActions.fetchComments(pageId));
    socket.emit(SocketEvents.PAGE_JOIN, pageId);
    socket.on(SocketEvents.PAGE_NEW_COMMENT, onComment);

    return (): void => {
      socket.off(SocketEvents.PAGE_NEW_COMMENT, onComment);
    };
  }, []);

  const handleSubmit = async (text: string): Promise<void> => {
    setIsLoading(true);
    await dispatch(
      commentsActions.createComment({ pageId, payload: { text } }),
    );
    setIsLoading(false);
  };

  return (
    <Card border="light" className={styles.card}>
      <Card.Header className={getAllowedClasses('bg-white', styles.header)}>
        Comments
      </Card.Header>
      <Card.Body>
        <CommentForm
          className="m-0"
          placeholder="Add a comment"
          isDisabled={isLoading}
          onSubmit={handleSubmit}
        />
        <div className={styles.list}>
          {comments.map((id) => (
            <Comment key={id} id={id} />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
