import { ToastContainer } from 'react-toastify';
import {
  useLocation,
  useAppSelector,
  useEffect,
  useHistory,
  useCookies,
} from 'hooks/hooks';
import {
  AppRoute,
  LocalStorageVariable,
  CookieVariable,
} from 'common/enums/enums';
import { ProtectedRoute, Route, Switch } from 'components/common/common';
import {
  Login,
  LoginGoogle,
  LoginGitHub,
  SignUp,
  SignUpInvite,
  SetPassword,
  ResetPassword,
} from 'components/auth/auth';
import Workspaces from 'components/workspaces/workspaces';
import Main from 'components/main/main';
import NotFound from 'components/not-found/not-found';

const App: React.FC = () => {
  const [cookies] = useCookies([CookieVariable.WORKSPACE_ID]);
  const { pathname } = useLocation();
  const isAuth = ([AppRoute.LOGIN, AppRoute.SIGN_UP] as string[]).includes(
    pathname,
  );
  const { isRefreshTokenExpired } = useAppSelector((state) => state.auth);
  const history = useHistory();
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);

  useEffect(() => {
    if (token && isAuth) {
      if (cookies[CookieVariable.WORKSPACE_ID]) {
        history.push(AppRoute.ROOT);
      } else {
        history.push(AppRoute.WORKSPACES);
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
        <Route path={AppRoute.LOGIN_GOOGLE} component={LoginGoogle} exact />
        <Route path={AppRoute.LOGIN_GITHUB} component={LoginGitHub} exact />
        <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
        <Route path={AppRoute.INVITE} component={SignUpInvite} exact />
        <Route path={AppRoute.RESET_PASSWORD} component={ResetPassword} exact />
        <Route path={AppRoute.SET_PASSWORD} component={SetPassword} exact />
        <ProtectedRoute
          path={AppRoute.WORKSPACES}
          component={Workspaces}
          exact
        />
        <ProtectedRoute path={AppRoute.ROOT} component={Main} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
