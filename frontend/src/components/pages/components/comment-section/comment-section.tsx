import { ListGroup } from 'react-bootstrap';
import {
  useAppDispatch,
  useAppSelector,
  useContext,
  useEffect,
  useState,
} from 'hooks/hooks';
import { SocketContext } from 'context/socket';
import { commentsActions } from 'store/actions';
import { IComment } from 'common/interfaces/comment';
import { SocketEvents } from 'common/enums/enums';
import { Comment, Response, CommentForm } from '../components';

type Props = {
  pageId: string;
};

export const CommentSection: React.FC<Props> = ({ pageId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const comments = useAppSelector((state) => state.comments.comments);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const onComment = (comment: IComment): void => {
    if (comment.author.id === user?.id) {
      return;
    }

    if (comment.parentCommentId) {
      dispatch(commentsActions.addResponse(comment));
    } else {
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

  const handleResponse = (commentId: string, text: string): void => {
    dispatch(
      commentsActions.createResponse({
        pageId,
        payload: { text, parentCommentId: commentId },
      }),
    );
  };

  return (
    <>
      <CommentForm
        className="mb-5"
        placeholder="Add a comment"
        isDisabled={isLoading}
        onSubmit={handleSubmit}
      />
      <ListGroup variant="flush">
        {comments.map(
          ({
            id,
            text,
            author: { id: userId, fullName, avatar },
            children,
          }) => (
            <Comment
              key={id}
              userId={userId}
              name={fullName}
              avatar={avatar}
              text={text}
              handleResponse={(text: string): void => handleResponse(id, text)}
            >
              {children &&
                children.map(
                  ({ id, text, author: { id: userId, fullName, avatar } }) => (
                    <Response
                      key={id}
                      userId={userId}
                      name={fullName}
                      avatar={avatar}
                      text={text}
                    />
                  ),
                )}
            </Comment>
          ),
        )}
      </ListGroup>
    </>
  );
};
