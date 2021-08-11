import React from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Col, Row } from 'react-bootstrap';
import isUUID from 'is-uuid';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  useParams,
  useHistory,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { pagesActions } from 'store/pages';
import { CommentSection } from '../comment-section/comment-section';
import { Spinner } from 'components/common/spinner/spinner';
import styles from './styles.module.scss';
import PageContributors from '../page-contributors/page-contributors';
import { PageApi } from 'services';
import { IPageContributor } from 'common/interfaces/pages';

const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const { user } = useAppSelector((state) => state.auth);
  const pageApi = new PageApi();
  const pageTitle = currentPage?.pageContents[0]?.title;
  const content = currentPage?.pageContents[0]?.content;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;

  const [isContributorsLoading, setIsContributorsLoading] = useState(false);
  const [contributors, setContributors] = useState<IPageContributor[]>([]);

  const getPageById = async (id?: string): Promise<void> => {
    const payload: string | undefined = id;
    await dispatch(pagesActions.getPage(payload));
  };

  useEffect(() => {
    if (paramsId && isUUID.anyNonNil(paramsId)) {
      setIsContributorsLoading(true);
      new PageApi()
        .getPageContributors(paramsId)
        .then((contributors) => setContributors(contributors))
        .finally(() => setIsContributorsLoading(false));

      getPageById(paramsId);
    } else {
      dispatch(pagesActions.clearCurrentPage());
      history.push(AppRoute.ROOT);
    }
  }, [paramsId]);

  const Content: React.FC = () => {
    const { isCurrentPageFollowed } = useAppSelector(
      (state: RootState) => state.pages,
    );

    const isPageFollowed = async (): Promise<void> => {
      if (currentPage?.followingUsers) {
        currentPage.followingUsers.map(async (follower) => {
          if (follower.id === user?.id) {
            await dispatch(pagesActions.setCurrentPageFollowed(true));
          }
        });
      }
    };

    const onPageFollow = async (pageId: string | undefined): Promise<void> => {
      await pageApi.followPage(pageId);
      await dispatch(pagesActions.setPage(pageId));
    };

    const onPageUnfollow = async (
      pageId: string | undefined,
    ): Promise<void> => {
      await pageApi.unfollowPage(pageId);
      await dispatch(pagesActions.setPage(pageId));
    };

    useEffect(() => {
      isPageFollowed();
    }, []);

    return (
      <div className="p-4">
        <Row>
          <Col>
            <div className="d-flex flex-row justify-content-between">
              <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
              <Button
                className="mb-3"
                onClick={
                  isCurrentPageFollowed
                    ? (): Promise<void> => onPageUnfollow(paramsId)
                    : (): Promise<void> => onPageFollow(paramsId)
                }
              >
                {isCurrentPageFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <PageContributors contributors={contributors} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card border="light" className={styles.card}>
              <Card.Body>
                <Card.Text>{content || 'Empty page'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card border="light" className={styles.card}>
              <Card.Header>Comments</Card.Header>
              <Card.Body>
                <CommentSection pageId={paramsId} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return !isSpinner && !isContributorsLoading ? <Content /> : <Spinner />;
};

export default PageContent;
