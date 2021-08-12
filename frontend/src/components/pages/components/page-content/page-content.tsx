import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
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
import { pagesActions } from 'store/pages';
import { AppRoute, PermissionType } from 'common/enums/enums';
import { Popup } from '../popup/popup';
import { CommentSection } from '../comment-section/comment-section';
import ModalComponent from 'components/modal/modal';
import { Spinner } from 'components/common/spinner/spinner';
import PageContributors from '../page-contributors/page-contributors';
import { PageApi } from 'services';
import { IPageContributor } from 'common/interfaces/pages';
import EditButton from '../edit-button/edit-button';
import { replaceIdParam } from 'helpers/helpers';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const { user } = useAppSelector((state) => state.auth);
  const pageApi = new PageApi();
  const pageTitle = currentPage?.pageContents[0]?.title;
  const content = currentPage?.pageContents[0]?.content;

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;

  const isPageAdmin = currentPage?.permission === PermissionType.ADMIN;
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

  const onAssign = (): void => {
    setIsPopUpVisible(true);
  };

  const handleAssignCancel = (): void => {
    setIsPopUpVisible(false);
  };

  const handleIviteCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleAssignConfirm = (): void => {
    setIsPopUpVisible(false);
    setIsModalVisible(true);
  };

  const handleEditing = (): void => {
    history.push(replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || ''));
  };

  const Content: React.FC = () => {
    const { isCurrentPageFollowed } = useAppSelector(
      (state: RootState) => state.pages,
    );

    const isPageFollowed = async (): Promise<void> => {
      if (currentPage?.followingUsers) {
        currentPage.followingUsers.map((follower) => {
          if (follower.id === user?.id) {
            dispatch(pagesActions.setCurrentPageFollowed(true));
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
          <Col xs={2}>
            <PageContributors contributors={contributors} />
          </Col>
          <Col>
            <Row>
              <Col className="d-flex justify-content-between mb-4">
                <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
                <div>
                  {isPageAdmin && (
                    <Button onClick={onAssign} className="me-3">
                      Assign permissions
                    </Button>
                  )}
                  <EditButton onClick={handleEditing} />
                  <Button
                    className="ms-3"
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
                <Card border="light" className={getAllowedClasses(styles.card)}>
                  <Card.Body className={getAllowedClasses(styles.content)}>
                    <ReactMarkdown>{content || 'Empty page'}</ReactMarkdown>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card border="light" className={getAllowedClasses(styles.card)}>
                  <Card.Header>Comments</Card.Header>
                  <Card.Body>
                    <CommentSection pageId={paramsId} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Popup
          query="Users & Teams"
          isVisible={isPopUpVisible}
          cancelButton={{
            text: 'Cancel',
            onClick: handleAssignCancel,
          }}
          inviteButton={{
            text: 'Add user',
            onClick: handleAssignConfirm,
          }}
        />
        <ModalComponent
          onModalClose={handleIviteCancel}
          title={'Invite to Workspace'}
          showModal={isModalVisible}
        />
      </div>
    );
  };

  return !isSpinner && !isContributorsLoading ? <Content /> : <Spinner />;
};

export default PageContent;
