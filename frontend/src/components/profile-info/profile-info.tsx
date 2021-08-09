import Avatar from 'react-avatar';
import { useState, useEffect, useParams } from '../../hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import './profile-info.scss';
import { UserApi, PageApi } from 'services';
import { IPageFollowed } from 'common/interfaces/page';

const ProfileInfo: React.FC = () => {
  const [user, setUser] = useState({
    id: '',
    avatar: '',
    fullName: '',
    email: '',
  });
  const [pages, setPages] = useState<IPageFollowed[]>([]);
  const [permission, setPermission] = useState(true);
  const userApi = new UserApi();
  const pageApi = new PageApi();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    let mounted = true;
    const getUser = async ():Promise<void> => {
      await userApi
        .getUserInfo(id)
        .then((user) => {
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

    const getFollowedPages = async ():Promise<void> => {
      await pageApi
        .getPagesFollowedByUser(id)
        .then((pages) => {
          if (mounted) {
            setPages(pages);
          }
        });
    };

    getUser();
    getFollowedPages();

    return ():void => { mounted = false; };
  }, []);

  return (
    <Container className="profile-container" fluid>
      {permission ? (user.id.length > 0 ? <>
        <Row>
          <Col className="d-flex justify-content-start profile-page-title">Profile</Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-start profile-card-title">Profile Details</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="card-block-item align-items-center">
                        <Avatar
                          size="100"
                          name={user?.fullName}
                          src={user?.avatar ? user?.avatar + `?${performance.now()}` : ''}
                          round={true}
                          className="user-avatar"
                        />
                        <Card.Title className="profile-user-title">{user?.fullName}</Card.Title>
                        <Card.Subtitle className="profile-user-subtitle">Lead Developer</Card.Subtitle>
                      </ListGroup.Item>
                      <ListGroup.Item className="card-block-item">
                        <Card.Title className="d-flex justify-content-start profile-skills-title">
                        Skills
                        </Card.Title>
                        <div className="d-flex align-items-start flex-wrap">
                          <Badge bg="primary" className="skill-badge">HTML</Badge>
                          <Badge bg="primary" className="skill-badge">Javascript</Badge>
                          <Badge bg="primary" className="skill-badge">React</Badge>
                          <Badge bg="primary" className="skill-badge">Angular</Badge>
                          <Badge bg="primary" className="skill-badge">Vue</Badge>
                          <Badge bg="primary" className="skill-badge">SASS</Badge>
                          <Badge bg="primary" className="skill-badge">Redux</Badge>
                          <Badge bg="primary" className="skill-badge">UI</Badge>
                          <Badge bg="primary" className="skill-badge">UX</Badge>
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
                <Card.Title className="d-flex justify-content-start profile-card-title">Followings</Card.Title>
                <div className="following-pages-container">
                  {pages.length > 0 ? pages.map(page => <Link to={`${AppRoute.PAGE.slice(0, AppRoute.PAGE.length - 3)}${page.id}`} key={page.id} className="following-page"><i className="bi bi-file-text-fill"></i>{page.title}</Link>)
                    : null}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </> : null) : <h1 className="d-flex justify-content-center">Permission denied</h1>}
    </Container>
  );
};

export default ProfileInfo;
