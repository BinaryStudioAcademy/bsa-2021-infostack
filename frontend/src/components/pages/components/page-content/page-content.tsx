import ReactMarkdown from 'react-markdown';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import './page-content.scss';
import { Card, Spinner } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import isUUID from 'is-uuid';
import { useHistory } from 'react-router';
import { AppRoute } from 'common/enums/enums';
import EditButton from '../edit-button/edit-button';

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

  const handleEditing = (): void => {
    history.push(AppRoute.CONTENT_SETTING.replace(':id', paramsId));
  };

  const Content: React.FC = () => {
    return (
      <div className="content">
        <div className="container-fluid p-0">
          <div className="d-flex justify-content-between mb-4">
            <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
            <EditButton onClick={handleEditing} />
          </div>
          <div className="row">
            <div className="col-12">
              <Card>
                <Card.Header>
                  <ReactMarkdown>{content || 'Empty page'}</ReactMarkdown>
                </Card.Header>
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
