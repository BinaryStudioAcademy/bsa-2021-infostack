import { RequestStatus } from 'common/enums/app';
import { Spinner } from 'components/common/common';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { Button } from 'react-bootstrap';
import { commentsActions } from 'store/comments';
import { selectRootIds } from 'store/comments/slice';
import { Comment } from '../components';

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
    content = <Spinner />;
  } else if (fetchStatus === RequestStatus.SUCCEEDED) {
    content = comments.map((id) => (
      <Comment key={id} id={id} handleDelete={handleDelete} />
    ));
  } else if (fetchStatus === RequestStatus.FAILED) {
    content = (
      <div className={styles.error}>
        <p>Could not load comments</p>
        <Button variant="success" onClick={handleClick}>
          Retry
        </Button>
      </div>
    );
  }

  return <div className={styles.main}>{content}</div>;
};
