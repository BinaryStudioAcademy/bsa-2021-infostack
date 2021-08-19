import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import slug from 'remark-slug';
import isUUID from 'is-uuid';
import { toast } from 'react-toastify';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  useParams,
  useHistory,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { pagesActions } from 'store/actions';
import { AppRoute, PermissionType } from 'common/enums/enums';
import { PageApi } from 'services';
import { replaceIdParam, getAllowedClasses } from 'helpers/helpers';
import VersionDropdown from '../version-dropdown/version-dropdown';
import { ConfirmModal, InviteModal, Spinner } from 'components/common/common';
import {
  PageTableOfContents,
  PageContributors,
  PageFollowingUsers,
  CommentSection,
  Popup,
  PageActionsDropdown,
} from '../components';
import {
  IPageContent,
  IPageContributor,
  IPageTableOfContentsHeading,
} from 'common/interfaces/pages';
import { FollowModal } from '../follow-modal/follow-modal';
import PageTags from '../page-tags/page-tags';
import styles from './styles.module.scss';

export const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const childPages = useAppSelector((state) => {
    const { pages, currentPage } = state.pages;

    if (pages && currentPage) {
      const page = pages.find((page) => page.id === currentPage.id);
      return page ? page.childPages : null;
    }
  });
  const { isCurrentPageFollowed } = useAppSelector(
    (state: RootState) => state.pages,
  );
  const { user } = useAppSelector((state) => state.auth);

  const [currContent, setCurrContent] = useState<IPageContent | undefined>();
  const [isPermissionsModalVisible, setIsPermissionsModalVisible] =
    useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLeftBlockLoading, setIsLeftBlockLoading] = useState(false);
  const [contributors, setContributors] = useState<IPageContributor[]>([]);
  const [TOCHeadings, setTOCHeadings] = useState<IPageTableOfContentsHeading[]>(
    [],
  );

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;
  const paramsVersionId = useParams<{ versionId: string }>().versionId;

  const isParentPage = !!currentPage?.parentPageId;
  const pageTitle = currContent
    ? currContent.title
    : currentPage?.pageContents[0].title || undefined;

  const content = currContent
    ? currContent.content
    : currentPage?.pageContents[0].content || undefined;

  const canView = currentPage?.permission ? true : false;

  const canRead =
    currentPage?.permission === PermissionType.READ ||
    currentPage?.permission === PermissionType.WRITE ||
    currentPage?.permission === PermissionType.ADMIN;

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
    if (paramsVersionId) {
      const currentContent = currentPage?.pageContents.find(
        (content) => content.id === paramsVersionId,
      );
      if (currentContent) {
        setCurrContent(currentContent);
      }
    }
  }, [paramsVersionId]);

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
    setIsPermissionsModalVisible(true);
  };

  const handleAssignCancel = (): void => {
    setIsPermissionsModalVisible(false);
  };

  const handleAssignConfirm = (): void => {
    setIsPermissionsModalVisible(false);
    setIsInviteModalVisible(true);
  };

  const handleIviteCancel = (): void => {
    setIsInviteModalVisible(false);
  };

  const onEditing = (): void => {
    history.push(replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || ''));
  };

  const onDelete = (): void => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (currentPage) {
      await dispatch(pagesActions.deletePage(currentPage.id));
      history.push(AppRoute.ROOT);
      toast.info('Page has been deleted successfully.', {
        closeOnClick: false,
        pauseOnHover: true,
      });
    }
  };

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
      setIsFollowModalVisible(false);
      await dispatch(pagesActions.followPage({ pageId, withChildren }));
    };

  const handlePageUnfollow =
    (pageId: string) =>
    async (withChildren: boolean): Promise<void> => {
      setIsFollowModalVisible(false);
      await dispatch(pagesActions.unfollowPage({ pageId, withChildren }));
    };

  const onPageFollow = (): void => {
    if (childPages && childPages.length) {
      setIsFollowModalVisible(true);
    } else {
      isCurrentPageFollowed
        ? handlePageUnfollow(paramsId)(false)
        : handlePageFollow(paramsId)(false);
    }
  };

  useEffect(() => {
    isPageFollowed();
  }, [isPageFollowed]);

  if (isSpinner || isLeftBlockLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      {canView ? (
        <>
          <Row>
            <Col xs={2}>
              <PageTableOfContents headings={TOCHeadings} />
              <PageTags />
              <PageContributors className="mt-4" contributors={contributors} />
              <PageFollowingUsers
                className="mt-4"
                followers={currentPage?.followingUsers}
              />
            </Col>
            <Col>
              <Row>
                <Col className="d-flex justify-content-between mb-4 align-items-center">
                  <h1 className="h3">{pageTitle || 'New Page'}</h1>
                  <div className="d-flex align-items-center">
                    {canRead && (
                      <VersionDropdown
                        currContent={currContent}
                        contributors={contributors}
                      />
                    )}

                    <PageActionsDropdown
                      className="ms-3"
                      onAssign={onAssign}
                      onEditing={onEditing}
                      onPageFollow={onPageFollow}
                      onDelete={onDelete}
                      isCurrentPageFollowed={isCurrentPageFollowed}
                    />
                  </div>
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
              <Row>
                <Col>
                  <CommentSection pageId={paramsId} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Popup
            query="Users & Teams"
            isVisible={isPermissionsModalVisible}
            cancelButton={{
              text: 'Cancel',
              onClick: handleAssignCancel,
            }}
            inviteButton={{
              text: 'Add user',
              onClick: handleAssignConfirm,
            }}
          />
          <InviteModal
            onModalClose={handleIviteCancel}
            showModal={isInviteModalVisible}
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
          <ConfirmModal
            title="Delete confirmation"
            showModal={isDeleteModalVisible}
            modalText={
              isParentPage
                ? 'Are you sure you want to delete this page?'
                : // prettier-ignore
                  'It\'s a parent page. Are you sure you want to delte this page with its child pages?'
            }
            confirmButton={{
              text: 'Delete',
              onClick: handleDeleteConfirm,
              variant: 'danger',
            }}
            cancelButton={{
              text: 'Close',
              onClick: handleDeleteCancel,
            }}
          />
        </>
      ) : (
        <h1 className="d-flex justify-content-center">
          No permission to view the requested page
        </h1>
      )}
    </div>
  );
};
