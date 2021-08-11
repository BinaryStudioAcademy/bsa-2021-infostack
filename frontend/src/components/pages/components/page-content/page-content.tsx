import ReactMarkdown from 'react-markdown';
import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  useParams,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import './page-content.scss';
import { Spinner, Card, Col, Row } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import isUUID from 'is-uuid';
import { useHistory } from 'react-router';
import { AppRoute } from 'common/enums/enums';
import EditButton from '../edit-button/edit-button';
import PageContributors from '../page-contributors/page-contributors';
import { PageApi } from 'services';
import { IPageContributor } from 'common/interfaces/pages';
import { replaceIdParam } from 'helpers/helpers';

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

  const handleEditing = (): void => {
    history.push(replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || ''));
  };

  const Content: React.FC = () => {
    return (
      <div className="content">
        <div className="container-fluid p-0">
          <Row>
            <Col lg={3}>
              <PageContributors contributors={contributors} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex justify-content-between mb-4">
                <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
                <EditButton onClick={handleEditing} />
              </div>
              <Card>
                <Card.Header>
                  <ReactMarkdown>{content || 'Empty page'}</ReactMarkdown>
                </Card.Header>
                <Card.Title></Card.Title>
                <Card.Body>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isSpinner && !isContributorsLoading ? (
        <Content />
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </>
  );
};

export default PageContent;
