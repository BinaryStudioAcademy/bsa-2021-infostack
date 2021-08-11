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
  const pageTitle = currentPage?.pageContents[0].title;
  const content = currentPage?.pageContents[0].content;

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
    return (
      <div className="p-4">
        <PageContributors contributors={contributors} />
        <Row>
          <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
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
              <Card.Header className="bg-white border-0 pb-2 text-body">
                <h2 className="h6">Comments</h2>
              </Card.Header>
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
