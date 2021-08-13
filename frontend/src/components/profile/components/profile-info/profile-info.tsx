import { useState, useEffect, useParams } from 'hooks/hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'components/common/common';
import './profile-info.scss';
import { UserApi } from 'services';
import { IUser } from 'common/interfaces/user';
import UserAvatar from 'components/common/avatar/avatar';
import { AppRoute } from '../../../../common/enums/enums';

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
                            <Link
                              to={
                                `${AppRoute.PAGE.slice(
                                  0,
                                  AppRoute.PAGE.length - 3,
                                )}${page.id}` as AppRoute
                              }
                              key={page.id}
                              className="following-page"
                            >
                              <i className="bi bi-file-text-fill"></i>
                              {page.pageContents[0].title}
                            </Link>
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
