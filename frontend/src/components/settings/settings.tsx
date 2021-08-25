import { Col, Container, Row, Tab } from 'react-bootstrap';
import {
  Redirect,
  Switch,
  useHistory,
  useRouteMatch,
  Route,
} from 'react-router-dom';
import {
  Menu,
  ProfileSettings,
  TeamSettings,
  UsersSettings,
  TagSettings,
  NotificationsSettings,
} from './components/components';
import { AppRoute } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const Settings: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const fullURL = history.location.pathname.split('/');
  const lastURL = fullURL[fullURL.length - 1];

  return (
    <main className={getAllowedClasses(styles.main)}>
      <Container
        fluid
        className={`p-0 ${getAllowedClasses(styles.settingsWrapper)}`}
      >
        <h3 className={getAllowedClasses(styles.menuHeading)}>Settings</h3>
        <Tab.Container id="list-group-tabs-example" activeKey={lastURL}>
          <Row className="gx-0">
            <Col xl={2} md={3} className={getAllowedClasses(styles.row)}>
              <Menu />
            </Col>
            <Col xl={10} md={9} className={getAllowedClasses(styles.row)}>
              <Tab.Content>
                <Switch>
                  <Route
                    path={AppRoute.SETTINGS_PROFILE}
                    component={ProfileSettings}
                    exact
                  />
                  <Route
                    path={AppRoute.SETTINGS_USERS}
                    component={UsersSettings}
                    exact
                  />
                  <Route
                    path={AppRoute.SETTINGS_TEAMS}
                    component={TeamSettings}
                    exact
                  />
                  <Route
                    path={AppRoute.SETTINGS_TAGS}
                    component={TagSettings}
                    exact
                  />
                  <Route
                    path={AppRoute.SETTINGS_NOTIFICATIONS}
                    component={NotificationsSettings}
                    exact
                  />
                  <Route path={match.path}>
                    <Redirect
                      from={AppRoute.SETTINGS}
                      to={AppRoute.SETTINGS_PROFILE}
                      push
                    />
                  </Route>
                </Switch>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </main>
  );
};

export default Settings;
