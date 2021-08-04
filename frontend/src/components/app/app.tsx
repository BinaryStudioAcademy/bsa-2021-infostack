import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import Workspaces from 'components/workspaces/workspaces';
import Workspace from 'components/workspace/workspace';
import Pages from 'components/pages/pages';
import Header from 'components/header/header';
import Profile from 'components/profile/profile';
import ProtectedRoute from 'components/common/protected-route/protected-route';
import { AppRoute, LocalStorageVariable } from 'common/enums/enums';
import { Route, Switch } from 'components/common/common';
import { useLocation, useAppDispatch, useAppSelector, useEffect, useHistory } from 'hooks/hooks';
import { authActions } from 'store/actions';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const isAuth = ([AppRoute.LOGIN, AppRoute.SIGN_UP] as string[]).includes(pathname);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);

  useEffect(() => {
    if (token) {
      if (isAuth) {
        history.push(AppRoute.ROOT);
      } else if (!isAuth && !user){
        dispatch(authActions.loadUser());
      }
    }
  }, []);

  return (
    <>
      {!isAuth && <Header />}
      <Switch>
        <Route path={AppRoute.LOGIN} component={Login} exact />
        <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
        <ProtectedRoute
          path={AppRoute.ROOT}
          component={(): JSX.Element => <h2>Stub</h2>}
          exact
        />
        <ProtectedRoute
          path={AppRoute.WORKSPACES}
          component={Workspaces}
          exact
        />
        <Route path={AppRoute.PAGES} component={Pages} exact />
        <ProtectedRoute
          path={AppRoute.SETTINGS_PROFILE}
          component={Profile}
          exact
        />
        <ProtectedRoute
          path={AppRoute.WORKSPACE_SETTING}
          component={Workspace}
          exact
        />
      </Switch>
    </>
  );
};

export default App;
