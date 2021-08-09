import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { commentsActions } from 'store/comments';
import { Comment } from '../comment/comment';
import { Response } from '../response/response';
import styles from './styles.module.scss';

type Props = {
  pageId: string;
};

export const CommentSection: React.FC<Props> = ({ pageId }) => {
  const comments = useAppSelector(state => state.comments.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(commentsActions.loadComments(pageId));
  }, []);

  return (
    <>
      <InputGroup className="mb-5">
        <Button className={styles.text}>Send</Button>
        <FormControl className={styles.text} as="textarea" />
      </InputGroup>
      <ListGroup variant="flush">
        {comments.map(({ id, text, author: { fullName, avatar }, children }) => (
          <Comment key={id} name={fullName} avatar={avatar} text={text}>
            {children && children.map(({ id, text, author: { fullName, avatar } }) => (
              <Response key={id} name={fullName} avatar={avatar} text={text} />
            ))}
          </Comment>
        ))}
      </ListGroup>
    </>
  );
};
