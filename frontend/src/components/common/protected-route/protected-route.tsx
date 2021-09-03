import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppRoute, LocalStorageVariable, CookieVariable } from 'common/enums';
import {
  useLocation,
  useAppSelector,
  useEffect,
  useHistory,
  useCookies,
} from 'hooks/hooks';
export const ProtectedRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const [cookies] = useCookies([CookieVariable.WORKSPACE_ID]);
  const { pathname } = useLocation();
  const isAuth = ([AppRoute.LOGIN, AppRoute.SIGN_UP] as string[]).includes(
    pathname,
  );
  const { isRefreshTokenExpired } = useAppSelector((state) => state.auth);
  const history = useHistory();
  const location = useLocation();
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

  if (token) {
    return <Route {...rest} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: AppRoute.LOGIN,
          state: { requestedPage: location.pathname },
        }}
      />
    );
  }
};
