import { Button } from 'react-bootstrap';

import { RequestStatus } from 'common/enums/app';
import { Spinner } from 'components/common/common';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { commentsActions } from 'store/comments';
import { selectRootIds } from 'store/comments/slice';
import { Comment } from '../comment/comment';

import styles from './styles.module.scss';

type Props = {
  pageId: string;
  handleDelete: (id: string) => void;
};

export const CommentList: React.FC<Props> = ({ pageId, handleDelete }) => {
  const comments = useAppSelector(selectRootIds);
  const { fetchStatus } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(commentsActions.fetchComments(pageId));
  };

  let content;

  if (fetchStatus === RequestStatus.LOADING) {
    content = <Spinner height={'6rem'} width={'6rem'} />;
  } else if (fetchStatus === RequestStatus.SUCCEEDED) {
    content = comments.length ? (
      comments.map((id) => (
        <Comment key={id} id={id} handleDelete={handleDelete} />
      ))
    ) : (
      <div className={styles.placeholder}>
        <p>
          There are currently no comments on this page, you can be the first to
          leave one
        </p>
      </div>
    );
  } else if (fetchStatus === RequestStatus.FAILED) {
    content = (
      <div className={styles.placeholder}>
        <p>Could not load comments</p>
        <Button variant="success" onClick={handleClick}>
          Retry
        </Button>
      </div>
    );
  }

  return <div className={styles.main}>{content}</div>;
};
