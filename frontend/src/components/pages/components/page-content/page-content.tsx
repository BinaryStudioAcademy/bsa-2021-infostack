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
import * as rangy from 'rangy';
import { MentionItem } from 'react-mentions';
import HighlightPop from 'react-highlight-pop';
import TurndownService from 'turndown';
import { SocketContext } from 'context/socket';
import { SocketEvents } from 'common/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
  useParams,
  useHistory,
  useRef,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { pagesActions } from 'store/actions';
import { AppRoute, PermissionType } from 'common/enums';
import { pageApi } from 'services';
import {
  replaceIdParam,
  getAllowedClasses,
  getParentsWithSkipping,
} from 'helpers/helpers';
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
  IExportPDF,
} from 'common/interfaces/pages';
import { FollowModal } from '../follow-modal/follow-modal';
import { ShareModal } from '../share-modal/share-modal';
import { ExportPDFModal } from '../export-pdf-modal/export-pdf-modal';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
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
      const filteredFollowedPages = childPages.filter((child) =>
        user.followingPages?.find((page) => child.id === page.id),
      );
      const pages = filteredFollowedPages.map((child) => ({
        ...child,
        ...childPages.find((page) => page.id === child.id),
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
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
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

  const canRead =
    currentPage?.permission === PermissionType.READ ||
    currentPage?.permission === PermissionType.WRITE ||
    currentPage?.permission === PermissionType.ADMIN;

  const [selectedText, setSelectedText] = useState('');

  const commentsRef = useRef<HTMLDivElement>(null);

  const [isTextSelected, setIsTextSelected] = useState(
    !!window?.getSelection(),
  );

  const [formState, setFormState] = useState<{
    text: string;
    mentions: MentionItem[];
  }>({
    text: '',
    mentions: [],
  });

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

  const getSelectionInHtml = (): string | undefined => {
    const html = rangy.getSelection().toHtml();
    const parentNode = window?.getSelection()?.anchorNode?.parentElement;
    if (!parentNode) {
      return;
    }
    const parentTags = getParentsWithSkipping(parentNode);
    const wrappedHtml = parentTags.reduce(
      (acc, tag) => `<${tag}>${acc}</${tag}>`,
      html,
    );

    return wrappedHtml;
  };

  const getSelectionInMarkdown = (): string | undefined => {
    const html = getSelectionInHtml();
    if (!html) {
      return;
    }
    const turndownService = new TurndownService({ emDelimiter: '*' });
    turndownService.addRule('del', {
      filter: ['del'],
      replacement: (content) => '~~' + content + '~~',
    });

    const selectedText = turndownService.turndown(html);
    return selectedText;
  };

  const handleMouseUp = (): void => {
    const selectedText = getSelectionInMarkdown();
    setIsTextSelected(!!selectedText);
    if (selectedText) {
      setSelectedText(selectedText);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    if (currentPage) {
      socket.emit(SocketEvents.PAGE_JOIN, currentPage.id);
      socket.on(SocketEvents.PAGE_NEW_CONTENT, onContentChange);
    }
    return (): void => {
      socket.off(SocketEvents.PAGE_NEW_CONTENT, onContentChange);
      document.removeEventListener('mouseup', handleMouseUp);
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

  const onExportPDF = (): void => {
    setIsExportModalVisible(true);
  };

  const handleExportPDFCancel = (): void => {
    setIsExportModalVisible(false);
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

  const handleCommentContent = (): void => {
    if (selectedText) {
      const quoteText = '> ' + selectedText + '\n\n';
      setFormState({ text: quoteText, mentions: [] });
      commentsRef?.current?.scrollIntoView();
      window?.getSelection()?.empty();
      setIsTextSelected(false);
    }
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
    if (currentPage && !currentPage.permission) {
      history.push('/*');
    }
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
    return (
      <div className="position-relative h-100">
        <Spinner height={'6rem'} width={'6rem'} />
      </div>
    );
  }

  const handleDownloadPDF = async (): Promise<void> => {
    const pageId = currentPage?.id as IExportPDF;
    const fileName = pageTitle || 'New Page';

    await pageApi.downloadPDF(pageId).then((response) => {
      const file = new Blob([response], {
        type: 'application/pdf',
      });

      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');

      link.href = fileURL;
      link.setAttribute('download', `${fileName}.pdf`);

      document.body.appendChild(link);

      link.click();
      link.remove();
    });
  };

  const handleSendPDF = async (email: string): Promise<void> => {
    const pageId = currentPage?.id as string;

    await pageApi.sendPDF({ pageId, email }).then(() => {
      toast.info('PDF file was sent to the specified email');
    });
  };

  return (
    <div className="p-4">
      <Row className="gx-5">
        <Col xxl={2} xl={3}>
          <PageTableOfContents headings={TOCHeadings} />
          <PageTags />
          <PageContributors className="mt-4" contributors={contributors} />
          <PageFollowingUsers
            className="mt-4"
            followers={currentPage?.followingUsers}
          />
        </Col>
        <Col xxl={10} xl={9}>
          <Row>
            <Breadcrumbs />
          </Row>
          <Row>
            <Col className="d-flex justify-content-between mb-4 align-items-start">
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={
                  <Popover id="popover-positioned-bottom">
                    <Popover.Body className={styles.popoverText}>
                      {pageTitle || 'New Page'}
                    </Popover.Body>
                  </Popover>
                }
              >
                <>
                  <div className="d-flex align-items-center">
                    <h1 className={getAllowedClasses(styles.pageHeading, 'h3')}>
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
                  onExportPDF={onExportPDF}
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
                    !isTextSelected ? styles.highlightPopHidden : null,
                  )}
                >
                  <HighlightPop
                    popoverItems={(itemClass: string): JSX.Element => (
                      <span
                        className={itemClass}
                        onClick={handleCommentContent}
                      >
                        <i
                          className={getAllowedClasses(
                            styles.quoteIcon,
                            'bi',
                            'bi-chat-quote',
                          )}
                        ></i>
                      </span>
                    )}
                  >
                    {/* @ts-expect-error see https://github.com/rehypejs/rehype/discussions/63 */}
                    <ReactMarkdown remarkPlugins={[slug, gfm]}>
                      {content?.trim() || 'Empty page'}
                    </ReactMarkdown>
                  </HighlightPop>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <CommentSection
                pageId={paramsId}
                commentsRef={commentsRef}
                formState={formState}
                setFormState={setFormState}
              />
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
      <ExportPDFModal
        show={isExportModalVisible}
        onModalClose={handleExportPDFCancel}
        onDownloadPDF={handleDownloadPDF}
        onSendPDF={handleSendPDF}
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
    </div>
  );
};
