import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useContext, useEffect, useState } from 'hooks/hooks';
import { SocketContext } from 'context/socket';
import { commentsActions } from 'store/comments';
import { Comment } from '../comment/comment';
import { Response } from '../response/response';
import styles from './styles.module.scss';
import { IComment } from 'common/interfaces/comment';

type Props = {
  pageId: string;
};

export const CommentSection: React.FC<Props> = ({ pageId }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const comments = useAppSelector(state => state.comments.comments);
  const user = useAppSelector(state => state.auth.user);
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
    dispatch(commentsActions.loadComments(pageId));
    socket.emit('page/join', pageId);
    socket.on('page/newComment', onComment);

    return (): void => {
      socket.off('page/newComment', onComment);
    };
  }, []);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void =>
    setText(value);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    await dispatch(commentsActions.createComment({ pageId, payload: { text } }));
    setIsLoading(false);
  };

  const handleResponse = (commentId: string, text: string): void => {
    dispatch(commentsActions.createResponse({
      pageId,
      payload: { text, parentCommentId: commentId } },
    ));
  };

  return (
    <>
      <InputGroup className="mb-5">
        <FormControl
          value={text}
          onChange={handleChange}
          className={styles.text}
          as="textarea"
        />
        <Button disabled={isLoading} onClick={handleSubmit} className={styles.text}>Send</Button>
      </InputGroup>
      <ListGroup variant="flush">
        {comments.map(({ id, text, author: { fullName, avatar }, children }) => (
          <Comment
            key={id}
            name={fullName}
            avatar={avatar}
            text={text}
            handleResponse={(text: string): void => handleResponse(id, text)}
          >
            {children && children.map(({ id, text, author: { fullName, avatar } }) => (
              <Response key={id} name={fullName} avatar={avatar} text={text} />
            ))}
          </Comment>
        ))}
      </ListGroup>
    </>
  );
};
