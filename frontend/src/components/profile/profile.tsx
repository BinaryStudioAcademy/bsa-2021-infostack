import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap';
import { getAllowedClasses } from '../../helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import ProfileEdit from './components/profile-edit/profile-edit';
import styles from './profile.module.scss';

const Profile: React.FC = () => {
  return (
    <main className={getAllowedClasses(styles.main)}>
      <Container fluid className="p-0">
        <h2 className="mb-3">Settings</h2>
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="#settings"
        >
          <Row>
            <Col xl={2} md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item action href="#settings">
                  Account
                </ListGroup.Item>
                <ListGroup.Item action href="#password">
                  Password
                </ListGroup.Item>
                <ListGroup.Item action href="#notifications">
                  Notifications
                </ListGroup.Item>
                <ListGroup.Item action href="#delete-account">
                  Delete account
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xl={10} md={9}>
              {' '}
              <Tab.Content>
                <Tab.Pane
                  eventKey="#settings"
                  className={getAllowedClasses(styles.tabPane)}
                >
                  <ProfileEdit />
                </Tab.Pane>
                <Tab.Pane eventKey="#password">
                  <h2>Password</h2>
                </Tab.Pane>
                <Tab.Pane eventKey="#notifications">
                  <h2>Notifications</h2>
                </Tab.Pane>
                <Tab.Pane eventKey="#delete-account">
                  <h2>Delete account</h2>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </main>
  );
};

export default Profile;
