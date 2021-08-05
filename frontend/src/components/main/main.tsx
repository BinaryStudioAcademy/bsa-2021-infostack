import { AppRoute, CookieVariable } from 'common/enums/enums';
import { Switch } from 'components/common/common';
import ProtectedRoute from 'components/common/protected-route/protected-route';
import Header from 'components/header/header';
import Toolbar from 'components/toolbar/toolbar';
import Pages from 'components/pages/pages';
import Profile from 'components/profile/profile';
import ProfileInfo from 'components/profile-info/profile-info';
import Workspace from 'components/workspace/workspace';
import styles from './styles.module.scss';
import Settings from 'components/settings/settings';
import { useAppSelector, useAppDispatch, useHistory, useCookies } from 'hooks/hooks';
import { workspacesActions } from 'store/actions';
import { RootState } from 'common/types/types';

const Main: React.FC = () => {
  const currentWorkspaceID = useAppSelector(
    (state: RootState) => state.workspaces.currentWorkspaceID,
  );
  const history = useHistory();

  if (!currentWorkspaceID) {
    const [cookies] = useCookies([
      CookieVariable.WORKSPACE_ID,
    ]);
    if (cookies.workspaceId) {
      const dispatch = useAppDispatch();
      dispatch(workspacesActions.SetCurrentWorkspaceID(cookies.workspaceId));
    } else {
      history.push(AppRoute.WORKSPACES);
    }
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
          <ProtectedRoute path={AppRoute.PROFILE} component={ProfileInfo} key={Date.now()} exact />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
