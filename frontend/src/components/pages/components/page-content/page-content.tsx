import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import slug from 'remark-slug';
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
import { pagesActions } from 'store/actions';
import { AppRoute, PermissionType } from 'common/enums/enums';
import { pageApi } from 'services';
import { replaceIdParam, getAllowedClasses } from 'helpers/helpers';
import VersionDropdown from '../version-dropdown/version-dropdown';
import { InviteModal, Spinner } from 'components/common/common';
import {
  EditButton,
  PageTableOfContents,
  PageContributors,
  PageFollowingUsers,
  CommentSection,
  Popup,
} from '../components';
import {
  IPageContent,
  IPageContributor,
  IPageTableOfContentsHeading,
} from 'common/interfaces/pages';
import { FollowModal } from '../follow-modal/follow-modal';
import styles from './styles.module.scss';
import PageTags from '../page-tags/page-tags';
import { PageDropdown } from '../page-dropdown/page-dropdown';

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

  const { user } = useAppSelector((state) => state.auth);
  const [currContent, setCurrContent] = useState<IPageContent | undefined>();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;

  const paramsVersionId = useParams<{ versionId: string }>().versionId;

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

  const pageTitle = currContent
    ? currContent.title
    : currentPage?.pageContents[0].title || undefined;

  const content = currContent
    ? currContent.content
    : currentPage?.pageContents[0].content || undefined;

  const isPageAdmin = currentPage?.permission === PermissionType.ADMIN;
  const canEdit =
    currentPage?.permission === PermissionType.ADMIN ||
    currentPage?.permission === PermissionType.WRITE;

  const canRead =
    currentPage?.permission === PermissionType.READ ||
    currentPage?.permission === PermissionType.WRITE ||
    currentPage?.permission === PermissionType.ADMIN;

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

      const contributorsPromise = pageApi.getPageContributors(paramsId);
      const TOCPromise = pageApi.getPageTableOfContents(paramsId);

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
    }, []);

    return (
      <div className="p-4">
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
              <Col className="d-flex justify-content-between mb-4">
                <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
                <div className="d-flex align-items-center">
                  {canRead && (
                    <VersionDropdown
                      currContent={currContent}
                      contributors={contributors}
                    />
                  )}
                  {isPageAdmin && (
                    <>
                      <Button
                        onClick={onAssign}
                        className={canEdit ? 'me-3' : ''}
                      >
                        Assign permissions
                      </Button>
                    </>
                  )}
                  {canEdit && <EditButton onClick={handleEditing} />}
                  <Button className="ms-3" onClick={onPageFollow}>
                    {isCurrentPageFollowed ? 'Unfollow' : 'Follow'}
                  </Button>
                  <PageDropdown className="ms-3" />
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
        <InviteModal
          onModalClose={handleIviteCancel}
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
