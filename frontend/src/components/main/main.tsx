import { AppRoute } from 'common/enums/enums';
import { Switch } from 'components/common/common';
import ProtectedRoute from 'components/common/protected-route/protected-route';
import Header from 'components/header/header';
import Toolbar from 'components/toolbar/toolbar';
import Pages from 'components/pages/pages';
import Profile from 'components/profile/profile';
import Workspace from 'components/workspace/workspace';
import styles from './styles.module.scss';
import Settings from 'components/settings/settings';
import { useAppSelector, useHistory } from 'hooks/hooks';
import { RootState } from 'common/types/types';

const Main: React.FC = () => {
  const currentWorkspaceID = useAppSelector(
    (state: RootState) => state.workspaces.currentWorkspaceID,
  );
  const history = useHistory();

  if (!currentWorkspaceID) {
    history.push(AppRoute.WORKSPACES);
  }

  return (
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
          <ProtectedRoute path={AppRoute.SETTINGS} component={Settings} />
          <ProtectedRoute path={AppRoute.SETTINGS_PROFILE} component={Profile} exact />
          <ProtectedRoute path={AppRoute.WORKSPACE_SETTING} component={Workspace} exact />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
