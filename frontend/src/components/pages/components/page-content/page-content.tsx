import {
  Card,
  Col,
  Row,
  Popover,
  OverlayTrigger,
  Button,
} from 'react-bootstrap';
import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import slug from 'remark-slug';
import isUUID from 'is-uuid';
import { toast } from 'react-toastify';
import { SocketContext } from 'context/socket';
import { SocketEvents } from 'common/enums';
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
import { AppRoute, PermissionType } from 'common/enums';
import { pageApi } from 'services';
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
  IPageTableOfContents,
  IPageTableOfContentsHeading,
  IPageNav,
} from 'common/interfaces/pages';
import { FollowModal } from '../follow-modal/follow-modal';
import { ShareModal } from '../share-modal/share-modal';
import PageTags from '../page-tags/page-tags';
import styles from './styles.module.scss';

export const PageContent: React.FC = () => {
  const socket = useContext(SocketContext);
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const childPages = useAppSelector((state) => {
    const { pages, currentPage } = state.pages;
    if (pages && currentPage) {
      const page = pages.find((page) => page.id === currentPage.id);
      return page ? page.childPages : null;
    }
  });

  const followedUserPages = useAppSelector((state) => {
    const { user } = state.auth;
    if (user && user.followingPages && childPages) {
      const pages = childPages.map((child) => ({
        ...user.followingPages?.find((page) => child.id === page.id),
        ...child,
      }));
      return pages;
    }
  }) as IPageNav[];

  const { isCurrentPageFollowed, isCurrentPagePinned } = useAppSelector(
    (state: RootState) => state.pages,
  );
  const { user } = useAppSelector((state) => state.auth);

  const notFollowedUserPages = useAppSelector((state) => {
    const { user } = state.auth;
    if (user && user.followingPages && childPages) {
      const pages = childPages?.filter(
        (child) =>
          user?.followingPages?.map((page) => page.id).indexOf(child.id) === -1,
      );
      return pages;
    }
  }) as IPageNav[];

  const [currContent, setCurrContent] = useState<IPageContent | undefined>();
  const [isPermissionsModalVisible, setIsPermissionsModalVisible] =
    useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [isLeftBlockLoading, setIsLeftBlockLoading] = useState(false);
  const [isRefreshButtonShowed, setIsRefreshButton] = useState(false);
  const [contributors, setContributors] = useState<IPageContributor[]>([]);
  const [TOCHeadings, setTOCHeadings] = useState<IPageTableOfContentsHeading[]>(
    [],
  );

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;
  const paramsVersionId = useParams<{ versionId: string }>().versionId;

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

  const onContentChange = (): void => {
    setIsRefreshButton(true);
  };

  const onRefresh = (pageId: string): void => {
    setIsRefreshButton(false);
    dispatch(pagesActions.getPage(pageId));
  };

  useEffect(() => {
    if (currentPage) {
      socket.emit(SocketEvents.PAGE_JOIN, currentPage.id);
      socket.on(SocketEvents.PAGE_NEW_CONTENT, onContentChange);
    }
    return (): void => {
      socket.off(SocketEvents.PAGE_NEW_CONTENT, onContentChange);
    };
  }, []);

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

      const contributorsPromise = pageApi.getPageContributors(paramsId);
      let TOCPromise: Promise<IPageTableOfContents>;

      if (paramsVersionId) {
        TOCPromise = pageApi.getPageVersionTableOfContents(
          paramsId,
          paramsVersionId,
        );
      } else {
        TOCPromise = pageApi.getPageTableOfContents(paramsId);
      }

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
  }, [paramsId, paramsVersionId]);

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

  const handleShareCancel = (): void => {
    setIsShareModalVisible(false);
  };

  const onEditing = (): void => {
    history.push(replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || ''));
  };

  const onDelete = (): void => {
    setIsDeleteModalVisible(true);
  };

  const onShare = (): void => {
    setIsShareModalVisible(true);
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

  const handlePageFollow =
    (pageId: string) =>
    async (ids: string[] | undefined): Promise<void> => {
      setIsFollowModalVisible(false);
      await dispatch(pagesActions.followPage({ pageId, ids }));
    };

  const handlePageUnfollow =
    (pageId: string) =>
    async (ids: string[] | undefined): Promise<void> => {
      setIsFollowModalVisible(false);
      await dispatch(pagesActions.unfollowPage({ pageId, ids }));
    };

  const onPageFollow = (): void => {
    const isFollowedPageHasFollowedPages =
      isCurrentPageFollowed && followedUserPages?.length;
    const isNotFollowedPageHasNotFollowedPages =
      !isCurrentPageFollowed && notFollowedUserPages?.length;

    if (
      isFollowedPageHasFollowedPages ||
      isNotFollowedPageHasNotFollowedPages
    ) {
      setIsFollowModalVisible(true);
      return;
    }
    isCurrentPageFollowed
      ? handlePageUnfollow(paramsId)(undefined)
      : handlePageFollow(paramsId)(undefined);
  };

  const onPagePin = (): void => {
    isCurrentPagePinned ? handlePageUnpin(paramsId) : handlePagePin(paramsId);
  };

  const handlePagePin = async (pageId: string): Promise<void> => {
    await dispatch(pagesActions.pinPage(pageId));
    await dispatch(pagesActions.getPinnedPagesAsync());
  };

  const handlePageUnpin = async (pageId: string): Promise<void> => {
    await dispatch(pagesActions.unpinPage(pageId));
    await dispatch(pagesActions.getPinnedPagesAsync());
  };

  useEffect(() => {
    if (currentPage?.followingUsers) {
      currentPage.followingUsers.map((follower) => {
        if (follower.id === user?.id) {
          dispatch(pagesActions.setCurrentPageFollowed(true));
        }
      });
    }
    if (currentPage?.pinnedUsers) {
      currentPage.pinnedUsers.map((pinner) => {
        if (pinner.id === user?.id) {
          dispatch(pagesActions.setCurrentPagePinned(true));
        }
      });
    }
  }, [currentPage]);

  if (isSpinner || isLeftBlockLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      {canView ? (
        <>
          <Row className="gx-5">
            <Col xs={12} lg={3} xl={2}>
              <PageTableOfContents headings={TOCHeadings} />
              <PageTags />
              <PageContributors className="mt-4" contributors={contributors} />
              <PageFollowingUsers
                className="mt-4"
                followers={currentPage?.followingUsers}
              />
            </Col>
            <Col xs={12} lg={9} xl={10}>
              <Row>
                <Col className="d-flex justify-content-between mb-4 align-items-center">
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={
                      <Popover id="popover-positioned-bottom">
                        <Popover.Body
                          className={getAllowedClasses(styles.popoverText)}
                        >
                          {pageTitle || 'New Page'}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <>
                      <div className="d-flex align-items-center">
                        <h1
                          className={getAllowedClasses(
                            styles.pageHeading,
                            'h3',
                          )}
                        >
                          {pageTitle || 'New Page'}
                        </h1>
                        {isRefreshButtonShowed && (
                          <Button
                            className="btn-success ms-2"
                            onClick={(): void => onRefresh(paramsId)}
                          >
                            Refresh
                          </Button>
                        )}
                      </div>
                    </>
                  </OverlayTrigger>
                  <div className="d-flex align-items-center">
                    {canRead && (
                      <VersionDropdown
                        currContent={currContent}
                        contributors={contributors}
                      />
                    )}

                    <PageActionsDropdown
                      onAssign={onAssign}
                      onEditing={onEditing}
                      onPageFollow={onPageFollow}
                      onPagePin={onPagePin}
                      onDelete={onDelete}
                      onShare={onShare}
                      isCurrentPageFollowed={isCurrentPageFollowed}
                      isCurrentPagePinned={isCurrentPagePinned}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Card border="light" className={styles.card}>
                    <Card.Body
                      className={getAllowedClasses(
                        styles.content,
                        'custom-html-style',
                      )}
                    >
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
          <ShareModal
            show={isShareModalVisible}
            onModalClose={handleShareCancel}
            pageId={paramsId}
          />
          <FollowModal
            show={isFollowModalVisible}
            isFollowing={isCurrentPageFollowed}
            childPages={
              isCurrentPageFollowed ? followedUserPages : notFollowedUserPages
            }
            handler={
              isCurrentPageFollowed
                ? handlePageUnfollow(paramsId)
                : handlePageFollow(paramsId)
            }
          />
          <ConfirmModal
            title="Delete confirmation"
            showModal={isDeleteModalVisible}
            modalText="Are you sure you want to delete this page? If this page contains subpages they will be deleted as well."
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
