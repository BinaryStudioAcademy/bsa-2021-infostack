import {
  useState,
  useEffect,
  useParams,
  useAppDispatch,
  useAppSelector,
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
import { UserApi } from 'services';
import { IUser } from 'common/interfaces/user';
import { FollowModal } from '../pages/components/follow-modal/follow-modal';
import { pagesActions } from 'store/actions';
import { AppRoute } from 'common/enums/enums';
import './profile-info.scss';

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
  const [permission, setPermission] = useState(true);
  const [currentPageId, setCurrentPageId] = useState<string>();
  const userApi = new UserApi();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    let mounted = true;
    const getUser = async (): Promise<void> => {
      await userApi.getUserInfo(id).then((user) => {
        if (user.id.length > 0) {
          if (mounted) {
            setPermission(true);
            setUser(user);
          }
        } else {
          if (mounted) {
            setPermission(false);
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

    if (pages && currentPageId) {
      const page = pages.find((page) => page.id === currentPageId);
      return page ? page.childPages : null;
    }
  });

  useEffect(() => {
    const followedChildPages = childPages
      ? childPages.map((childPage) =>
          user?.followingPages?.filter((page) => page.id === childPage.id),
        )[0]
      : null;

    if (childPages && childPages.length && followedChildPages?.length) {
      setIsFollowModalVisible(true);
    } else {
      if (currentPageId) {
        handlePageUnfollow()(false);
      }
    }
  }, [childPages]);

  const handlePageUnfollow =
    () =>
    async (withChildren: boolean): Promise<void> => {
      setIsFollowModalVisible(false);

      if (currentPageId) {
        await dispatch(
          pagesActions.unfollowPage({ pageId: currentPageId, withChildren }),
        );
        await userApi.getUserInfo(id).then((user) => setUser(user));
      }
    };

  const onPageUnfollow = async (pageId: string): Promise<void> => {
    setCurrentPageId(pageId);
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
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col sm={9}>
                <Card>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-start profile-card-title">
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
                                    `${AppRoute.PAGE.slice(
                                      0,
                                      AppRoute.PAGE.length - 3,
                                    )}${page.id}` as AppRoute
                                  }
                                  className="following-page-title-container"
                                >
                                  <i className="bi bi-file-text-fill"></i>
                                  {page.pageContents[0].title}
                                </Link>
                                <Button
                                  className="ms-3"
                                  onClick={(): Promise<void> =>
                                    onPageUnfollow(page.id)
                                  }
                                >
                                  Unfollow
                                </Button>
                              </div>
                              <FollowModal
                                show={isFollowModalVisible}
                                isFollowing={true}
                                handler={handlePageUnfollow()}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : null
      ) : (
        <h1 className="d-flex justify-content-center">Permission denied</h1>
      )}
    </Container>
  );
};

export default ProfileInfo;
