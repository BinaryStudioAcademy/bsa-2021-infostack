import Spinner from 'react-bootstrap/Spinner';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import './page-content.scss';
import { Card } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import isUUID from 'is-uuid';
import { useHistory } from 'react-router';
import { AppRoute } from 'common/enums/enums';

const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const pageTitle = currentPage?.pageContents[0].title;
  const content = currentPage?.pageContents[0].content;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;

  const getPageById = async (id?: string): Promise<void> => {
    const payload: string | undefined = id;
    await dispatch(pagesActions.getPage(payload));
  };

  useEffect(() => {
    if (paramsId && isUUID.anyNonNil(paramsId)) {
      getPageById(paramsId);
    } else {
      history.push(AppRoute.ROOT);
    }
  }, [paramsId]);

  const Content: React.FC = () => {
    return (
      <div className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
          <div className="row">
            <div className="col-12">
              <Card>
                <Card.Header>{content || 'Empty page'}</Card.Header>
                <Card.Title></Card.Title>
                <Card.Body>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isSpinner ? (
        <Content />
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </>
  );
};

export default PageContent;
