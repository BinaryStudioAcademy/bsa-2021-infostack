import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import slug from 'remark-slug';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  useHistory,
  useLocation,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { pagesActions } from 'store/actions';
import { AppRoute } from 'common/enums';
import { pageApi } from 'services';
import { getAllowedClasses } from 'helpers/helpers';
import { Spinner } from 'components/common/common';
import { PageTableOfContents } from '../pages/components/components';
import { IPageTableOfContentsHeading } from 'common/interfaces/pages';
import styles from './styles.module.scss';

export const SharedPage: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const [isLeftBlockLoading, setIsLeftBlockLoading] = useState(false);
  const [TOCHeadings, setTOCHeadings] = useState<IPageTableOfContentsHeading[]>(
    [],
  );

  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const pageTitle = currentPage?.pageContents[0].title || undefined;

  const content = currentPage?.pageContents[0].content || undefined;

  const getPageById = async (query?: string): Promise<void> => {
    const payload: string | undefined = query;
    await dispatch(pagesActions.getPageShared(payload));
    return;
  };

  useEffect(() => {
    if (location.search) {
      setIsLeftBlockLoading(true);
      getPageById(location.search);

      const TOCPromise = pageApi.getPageTableOfContentsShared(location.search);

      Promise.all([TOCPromise]).then(([TOC]) => {
        if (TOC) {
          setTOCHeadings(TOC.headings);
        } else {
          history.push('*');
        }
      });

      setIsLeftBlockLoading(false);
    } else {
      dispatch(pagesActions.clearCurrentPage());
      history.push(AppRoute.ROOT);
    }
  }, [location]);

  if (isSpinner || isLeftBlockLoading) {
    return <Spinner height={'12rem'} width={'12rem'} />;
  }

  return (
    <div className="p-4">
      <Row>
        <Col xs={2}>
          <PageTableOfContents headings={TOCHeadings} />
        </Col>
        <Col>
          <Row>
            <Col className="d-flex justify-content-between mb-4 align-items-center">
              <h1 className="h3">{pageTitle || 'New Page'}</h1>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Card border="light" className={styles.card}>
                <Card.Body className={getAllowedClasses(styles.content)}>
                  {/* @ts-expect-error see https://github.com/rehypejs/rehype/discussions/63 */}
                  <ReactMarkdown remarkPlugins={[slug, gfm]}>
                    {content?.trim() || 'Empty page'}
                  </ReactMarkdown>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
