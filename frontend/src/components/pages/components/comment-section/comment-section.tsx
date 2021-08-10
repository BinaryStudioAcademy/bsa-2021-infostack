import { useAppDispatch, useAppSelector, useEffect, useState } from 'hooks/hooks';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { commentsActions } from 'store/comments';
import { Comment } from '../comment/comment';
import { Response } from '../response/response';
import styles from './styles.module.scss';

type Props = {
  pageId: string;
};

export const CommentSection: React.FC<Props> = ({ pageId }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const comments = useAppSelector(state => state.comments.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(commentsActions.loadComments(pageId));
  }, []);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void =>
    setText(value);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    await dispatch(commentsActions.addComment({ pageId, payload: { text } }));
    setIsLoading(false);
  };

  const handleResponse = (commentId: string, text: string): void => {
    dispatch(commentsActions.addResponse({
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
