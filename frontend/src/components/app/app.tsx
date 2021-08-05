import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import Workspaces from 'components/workspaces/workspaces';
import Workspace from 'components/workspace/workspace';
import Pages from 'components/pages/pages';
import Profile from 'components/profile/profile';
import ProtectedRoute from 'components/common/protected-route/protected-route';
import { AppRoute, LocalStorageVariable } from 'common/enums/enums';
import { Route, Switch } from 'components/common/common';
import {
  useLocation,
  useAppDispatch,
  useAppSelector,
  useEffect,
  useHistory,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import Main from 'components/main/main';
import ResetPassword from '../reset-password/reset-password';
import SetPassword from '../set-password/set-password';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const isAuth = ([AppRoute.LOGIN, AppRoute.SIGN_UP] as string[]).includes(pathname);
  const { user } = useAppSelector(state => state.auth);
  const { isRefreshTokenExpired } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);

  useEffect(() => {
    if (token) {
      if (isAuth) {
        history.push(AppRoute.WORKSPACES);
      } else if (!isAuth && !user){
        dispatch(authActions.loadUser());
      }
    }
  }, []);

  useEffect(() => {
    if (isRefreshTokenExpired) {
      history.push(AppRoute.LOGIN);
    }
  }, [isRefreshTokenExpired]);

  return (
    <>
      <Switch>
        <Route path={AppRoute.LOGIN} component={Login} exact />
        <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
        <Route path={AppRoute.RESET_PASSWORD} component={ResetPassword} exact />
        <Route path={AppRoute.SET_PASSWORD} component={SetPassword} exact />
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
        <ProtectedRoute path={AppRoute.WORKSPACES} component={Workspaces} exact />
        <ProtectedRoute path={AppRoute.ROOT} component={Main} />
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
