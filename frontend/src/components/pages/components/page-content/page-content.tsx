import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
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
import {
  IPageContributor,
  IPageTableOfContentsHeading,
} from 'common/interfaces/pages';
import EditButton from '../edit-button/edit-button';
import { replaceIdParam } from 'helpers/helpers';
import PageTableOfContents from '../page-table-of-contents.tsx/page-table-of-contents';
import slug from 'remark-slug';
import { getAllowedClasses } from 'helpers/dom/dom';
import { FollowModal } from '../follow-modal/follow-modal';
import styles from './styles.module.scss';

const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const childPages = useAppSelector((state) => {
    const { pages, currentPage } = state.pages;

    if (pages && currentPage) {
      const page = pages.find((p) => p.id === currentPage.id);
      return page ? page.childPages : null;
    }
  });

  const { user } = useAppSelector((state) => state.auth);
  const last = currentPage?.pageContents?.length;
  const pageTitle = last
    ? currentPage?.pageContents[last - 1]?.title
    : undefined;
  const content = last
    ? currentPage?.pageContents[last - 1]?.content
    : undefined;

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFollowModalVisible, setIsFollowModalVisible] =
    useState<boolean>(false);
  const toggleFollowModal = (): void =>
    setIsFollowModalVisible((prev) => !prev);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;

  const isPageAdmin = currentPage?.permission === PermissionType.ADMIN;
  const canEdit =
    currentPage?.permission === PermissionType.ADMIN ||
    currentPage?.permission === PermissionType.WRITE;

  const [isLeftBlockLoading, setIsLeftBlockLoading] = useState(false);

  const [contributors, setContributors] = useState<IPageContributor[]>([]);
  const [TOCHeadings, setTOCHeadings] = useState<IPageTableOfContentsHeading[]>(
    [],
  );

  const getPageById = async (id?: string): Promise<void> => {
    const payload: string | undefined = id;
    if (currentPage && id !== currentPage.id) {
      await dispatch(pagesActions.getPage(payload));
    }
    if (!currentPage) {
      await dispatch(pagesActions.getPage(payload));
    }
    return;
  };

  useEffect(() => {
    if (paramsId && isUUID.anyNonNil(paramsId)) {
      setIsLeftBlockLoading(true);

      getPageById(paramsId);

      const contributorsPromise = new PageApi().getPageContributors(paramsId);
      const TOCPromise = new PageApi().getPageTableOfContents(paramsId);

      Promise.all([contributorsPromise, TOCPromise]).then(
        ([contributors, TOC]) => {
          setContributors(contributors);
          setTOCHeadings(TOC.headings);
        },
      );

      setIsLeftBlockLoading(false);
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

    const handlePageFollow =
      (pageId: string) =>
      async (withChildren: boolean): Promise<void> => {
        toggleFollowModal();
        await dispatch(pagesActions.followPage({ pageId, withChildren }));
      };

    const handlePageUnfollow =
      (pageId: string) =>
      async (withChildren: boolean): Promise<void> => {
        toggleFollowModal();
        await dispatch(pagesActions.unfollowPage({ pageId, withChildren }));
      };

    const onPageFollow = (): void => {
      if (childPages && childPages.length) {
        toggleFollowModal();
      } else {
        isCurrentPageFollowed
          ? handlePageUnfollow(paramsId)(false)
          : handlePageFollow(paramsId)(false);
      }
    };

    useEffect(() => {
      isPageFollowed();
    }, []);

    return (
      <div className="p-4">
        <Row>
          <Col xs={2}>
            <PageTableOfContents headings={TOCHeadings} />

            <PageContributors className="mt-4" contributors={contributors} />
          </Col>
          <Col>
            <Row>
              <Col className="d-flex justify-content-between mb-4">
                <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
                <div>
                  {isPageAdmin && (
                    <Button
                      onClick={onAssign}
                      className={canEdit ? 'me-3' : ''}
                    >
                      Assign permissions
                    </Button>
                  )}
                  {canEdit && <EditButton onClick={handleEditing} />}
                  <Button className="ms-3" onClick={onPageFollow}>
                    {isCurrentPageFollowed ? 'Unfollow' : 'Follow'}
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Card border="light" className={styles.card}>
                  <Card.Body className={getAllowedClasses(styles.content)}>
                    {/* @ts-expect-error see https://github.com/rehypejs/rehype/discussions/63 */}
                    <ReactMarkdown remarkPlugins={[slug, gfm]}>
                      {content || 'Empty page'}
                    </ReactMarkdown>
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
        <FollowModal
          show={isFollowModalVisible}
          isFollowing={isCurrentPageFollowed}
          handler={
            isCurrentPageFollowed
              ? handlePageUnfollow(paramsId)
              : handlePageFollow(paramsId)
          }
        />
      </div>
    );
  };

  return !isSpinner && !isLeftBlockLoading ? <Content /> : <Spinner />;
};

export default PageContent;
