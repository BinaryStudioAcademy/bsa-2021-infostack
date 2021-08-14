import { useState, useEffect, useParams } from 'hooks/hooks';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { Link, UserAvatar } from 'components/common/common';
import { UserApi } from 'services';
import { IUser } from 'common/interfaces/user';
import { AppRoute } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

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
    <Container className={getAllowedClasses(styles.profileContainer)} fluid>
      {permission ? (
        user && user.id.length > 0 ? (
          <>
            <Row>
              <Col
                className={getAllowedClasses(
                  styles.profilePageTitle,
                  'd-flex justify-content-start',
                )}
              >
                Profile
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title
                          className={getAllowedClasses(
                            styles.profileCardTitle,
                            'd-flex justify-content-start',
                          )}
                        >
                          Profile Details
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item
                            className={getAllowedClasses(
                              styles.cardBlockItem,
                              'align-items-center',
                            )}
                          >
                            <UserAvatar
                              size="100"
                              name={user?.fullName}
                              src={user?.avatar}
                              round={true}
                              className={getAllowedClasses(styles.userAvatar)}
                              showTooltip={false}
                            />
                            <Card.Title
                              className={getAllowedClasses(
                                styles.profileUserTitle,
                              )}
                            >
                              {user?.fullName}
                            </Card.Title>
                            <Card.Subtitle
                              className={getAllowedClasses(
                                styles.profileUserSubtitle,
                              )}
                            >
                              {user?.title}
                            </Card.Subtitle>
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={getAllowedClasses(styles.cardBlockItem)}
                          >
                            <Card.Title
                              className={getAllowedClasses(
                                styles.profileSkillsTitle,
                                'd-flex justify-content-start',
                              )}
                            >
                              Skills
                            </Card.Title>
                            <div className="d-flex align-items-start flex-wrap">
                              {!!user.skills?.length &&
                                user.skills.map(({ id, name }) => (
                                  <Badge
                                    bg="primary"
                                    className={getAllowedClasses(
                                      styles.skillBadge,
                                    )}
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
                    <Card.Title
                      className={getAllowedClasses(
                        styles.profileCardTitle,
                        'd-flex justify-content-start',
                      )}
                    >
                      Followings
                    </Card.Title>
                    <div
                      className={getAllowedClasses(
                        styles.followingPagesContainer,
                      )}
                    >
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
                              className={getAllowedClasses(
                                styles.followingPage,
                              )}
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
