import { Col, Container, Row, Tab } from 'react-bootstrap';
import {
  Redirect,
  Switch,
  useHistory,
  useRouteMatch,
  Route,
} from 'react-router-dom';
import { getAllowedClasses } from 'helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import ProfileEdit from '../profile/components/profile-edit/profile-edit';
import Menu from './components/menu';
import { AppRoute } from 'common/enums/enums';
import styles from './settings.module.scss';
import UsersSettings from 'components/workspace/users-settings/users-settings';

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
          <Row>
            <Col xl={2} md={3}>
              <Menu />
            </Col>
            <Col xl={10} md={9}>
              <Tab.Content>
                <Switch>
                  <Route
                    path={AppRoute.SETTINGS_PROFILE}
                    component={ProfileEdit}
                    exact
                  />
                  <Route
                    path={AppRoute.SETTINGS_USERS}
                    component={UsersSettings}
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
