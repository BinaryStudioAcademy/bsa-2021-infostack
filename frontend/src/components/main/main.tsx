import { AppRoute } from 'common/enums/enums';
import { Switch } from 'components/common/common';
import ProtectedRoute from 'components/common/protected-route/protected-route';
import Header from 'components/header/header';
import Toolbar from 'components/toolbar/toolbar';
import Pages from 'components/pages/pages';
import Profile from 'components/profile/profile';
import Workspace from 'components/workspace/workspace';
import styles from './styles.module.scss';

const Main: React.FC = () =>
  <div className={styles.grid}>
    <div className={styles.header}>
      <Header  />
    </div>
    <div className={styles.toolbar}>
      <Toolbar />
    </div>
    <div className={styles.content}>
      <Switch>
        <ProtectedRoute path={AppRoute.PAGES} component={Pages} />
        <ProtectedRoute path={AppRoute.SETTINGS_PROFILE} component={Profile} exact />
        <ProtectedRoute path={AppRoute.WORKSPACE_SETTING} component={Workspace} exact />
      </Switch>
    </div>
  </div>;

export default Main;
