import { useState, useEffect, useParams } from '../../hooks/hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import './profile-info.scss';
import USER_DEFAULT_AVATAR from '../../assets/img/user.svg';
import { UserApi } from 'services';

const ProfileInfo: React.FC = () => {
  const [user, setUser] = useState({
    id: '',
    avatar: '',
    fullName: '',
    email: '',
  });
  const [permission, setPermission] = useState(true);
  const userApi = new UserApi();
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

    getUser();

    return ():void => { mounted = false; };
  }, []);

  return (
    <Container className="profile-container">
      {permission ? (user.id.length > 0 ? <>
        <Row>
          <Col className="d-flex justify-content-start profile-page-title">Profile</Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-start profile-card-title">Profile details</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="card-block-item align-items-center">
                        <Image src={user?.avatar ? user.avatar : USER_DEFAULT_AVATAR} width={100} roundedCircle className="profile-image" />
                        <Card.Title className="profile-user-title">{user?.fullName}</Card.Title>
                        <Card.Subtitle className="profile-user-subtitle">Lead Developer</Card.Subtitle>
                      </ListGroup.Item>
                      <ListGroup.Item className="card-block-item">
                        <Card.Title className="d-flex justify-content-start profile-skills-subtitle">
                        Skills
                        </Card.Title>
                        <div className="d-flex align-items-start flex-wrap">
                          <h4>
                            <Badge bg="primary" className="skill-badge">HTML</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">Javascript</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">React</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">Angular</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">Vue</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">SASS</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">Redux</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">UI</Badge>
                          </h4>
                          <h4>
                            <Badge bg="primary" className="skill-badge">UX</Badge>
                          </h4>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-start profile-card-title">Followings</Card.Title>
                <div>
                  <div className="following-page-container">
                    <Link to={'#'} className="following-page"><i className="bi bi-card-text"></i> page 1</Link>
                  </div>
                  <div>
                    <Link to={'#'} className="following-page"><i className="bi bi-card-text"></i> page 2</Link>
                  </div>
                  <div>
                    <Link to={'#'} className="following-page"><i className="bi bi-card-text"></i> page 3</Link>
                  </div>
                  <div>
                    <Link to={'#'} className="following-page"><i className="bi bi-card-text"></i> page 4</Link>
                  </div>
                  <div>
                    <Link to={'#'} className="following-page"><i className="bi bi-card-text"></i> page 5</Link>
                  </div>
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
