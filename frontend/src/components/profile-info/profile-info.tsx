import {
  useState,
  useEffect,
  useParams,
  useAppDispatch,
  useAppSelector,
  useHistory,
} from 'hooks/hooks';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Button,
} from 'react-bootstrap';
import { Link, UserAvatar } from 'components/common/common';
import { IPageNav } from 'common/interfaces/pages';
import { FollowModal } from '../pages/components/follow-modal/follow-modal';
import { pagesActions } from 'store/actions';
import { AppRoute } from 'common/enums';
import './profile-info.scss';
import { replaceIdParam } from 'helpers/helpers';
import { Activities } from './components/components';
import { IUser } from 'common/interfaces';
import { userApi } from 'services';

const ProfileInfo: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    id: '',
    avatar: '',
    fullName: '',
    email: '',
    title: '',
    skills: [],
    followingPages: [],
  });
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [permission, setPermission] = useState(true);
  const [pageId, setPageId] = useState<string>();
  const { id } = useParams<{ id?: string }>();

  const history = useHistory();
  useEffect(() => {
    let mounted = true;
    const getUser = async (): Promise<void> => {
      await userApi.getUserInfo(id).then((user) => {
        if (mounted) {
          if (user.id) {
            setPermission(true);
            setUser(user);
          } else {
            history.push('/*');
          }
        }
      });
    };

    getUser();

    return (): void => {
      mounted = false;
    };
  }, [id]);

  const dispatch = useAppDispatch();
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);

  const childPages = useAppSelector((state) => {
    const { pages } = state.pages;

    if (pages && pageId) {
      const page = pages?.find((page) => page.id === pageId);
      return page ? page.childPages : null;
    }
  });

  const followedUserPages = useAppSelector((state) => {
    const { user } = state.auth;
    if (user && user.followingPages && childPages) {
      const pages = childPages.filter((child) =>
        user.followingPages?.find((page) => child.id === page.id),
      );
      return pages;
    }
  }) as IPageNav[];

  useEffect(() => {
    if (followedUserPages?.length) {
      setIsFollowModalVisible(true);
      return;
    }
    if (pageId) {
      handlePageUnfollow()(undefined);
    }
  }, [pageId]);

  const handlePageUnfollow =
    () =>
    async (ids: string[] | undefined): Promise<void> => {
      setIsFollowModalVisible(false);
      if (pageId) {
        await dispatch(pagesActions.unfollowPage({ pageId, ids }));
      }
    };

  const onPageUnfollow = async (pageId: string): Promise<void> => {
    setPageId(pageId);
  };

  return (
    <Container className="profile-container" fluid>
      {permission ? (
        user && user.id.length > 0 ? (
          <>
            <Row>
              <Col className="d-flex justify-content-start profile-page-title">
                Profile
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-start profile-card-title">
                          Profile Details
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="card-block-item align-items-center">
                            <UserAvatar
                              size="100"
                              name={user?.fullName}
                              src={user?.avatar}
                              round={true}
                              className="user-avatar"
                              showTooltip={false}
                            />
                            <Card.Title className="profile-user-title">
                              {user?.fullName}
                            </Card.Title>
                            <Card.Subtitle className="profile-user-subtitle">
                              {user?.title}
                            </Card.Subtitle>
                          </ListGroup.Item>
                          <ListGroup.Item className="card-block-item">
                            <Card.Title className="d-flex justify-content-start profile-skills-title">
                              Skills
                            </Card.Title>
                            <div className="d-flex align-items-start flex-wrap">
                              {!!user.skills?.length &&
                                user.skills.map(({ id, name }) => (
                                  <Badge
                                    bg="primary"
                                    className="skill-badge"
                                    key={id}
                                  >
                                    {name}
                                  </Badge>
                                ))}
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item className="card-block-item">
                            <Card.Title className="d-flex justify-content-start profile-skills-title">
                              Followings
                            </Card.Title>
                            <div className="following-pages-container">
                              {user &&
                              user.followingPages &&
                              user?.followingPages?.length > 0
                                ? user?.followingPages?.map((page) => (
                                    <div key={page.id}>
                                      <div className="following-page d-flex justify-content-between">
                                        <Link
                                          to={
                                            replaceIdParam(
                                              AppRoute.PAGE,
                                              page.id,
                                            ) as AppRoute
                                          }
                                          className="following-page-title-container"
                                        >
                                          <i className="bi bi-file-text-fill"></i>
                                          {page.pageContents[0].title}
                                        </Link>
                                        {currentUser?.id === id && (
                                          <Button
                                            variant="danger"
                                            className="ms-3"
                                            size="sm"
                                            onClick={(): Promise<void> =>
                                              onPageUnfollow(page.id)
                                            }
                                          >
                                            Unfollow
                                          </Button>
                                        )}
                                      </div>
                                      <FollowModal
                                        show={isFollowModalVisible}
                                        isFollowing={true}
                                        childPages={followedUserPages}
                                        handler={handlePageUnfollow()}
                                      />
                                    </div>
                                  ))
                                : null}
                            </div>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col sm={9}>
                <Card>
                  <Card.Body>
                    <Activities />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : null
      ) : null}
    </Container>
  );
};

export default ProfileInfo;
