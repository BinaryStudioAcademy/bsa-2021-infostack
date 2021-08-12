import {
  AppRoute,
  CookieVariable,
  LocalStorageVariable,
} from 'common/enums/enums';
import { Route, Switch } from 'components/common/common';
import WithHeader from 'components/common/with-header/with-header';
import Pages from 'components/pages/pages';
import ProfileInfo from 'components/profile-info/profile-info';
import Workspace from 'components/workspace/workspace';
import Settings from 'components/settings/settings';
import PageContentEditor from 'components/pages/components/content-editor/content-editor';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useHistory,
  useCookies,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { workspacesActions } from 'store/actions';
import NotFound from 'components/not-found/not-found';

const Main: React.FC = () => {
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const { user } = useAppSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [cookies] = useCookies([CookieVariable.WORKSPACE_ID]);
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);

  useEffect(() => {
    if (token && !user) {
      dispatch(authActions.loadUser());
    }
  }, []);

  useEffect(() => {
    if (!currentWorkspace) {
      if (cookies[CookieVariable.WORKSPACE_ID]) {
        dispatch(
          workspacesActions.loadWorkspace(cookies[CookieVariable.WORKSPACE_ID]),
        );
      } else {
        history.push(AppRoute.WORKSPACES);
      }
    }
  }, [currentWorkspace]);

  return (
    <Switch>
      <Route
        path={AppRoute.PAGE}
        render={(): JSX.Element => <WithHeader Component={Pages} />}
        exact
      />
      <Route
        path={AppRoute.SETTINGS}
        render={(): JSX.Element => <WithHeader Component={Settings} />}
      />
      <Route
        path={AppRoute.PROFILE}
        render={(): JSX.Element => <WithHeader Component={ProfileInfo} />}
        key={Date.now()}
      />
      <Route
        path={AppRoute.WORKSPACE_SETTING}
        render={(): JSX.Element => <WithHeader Component={Workspace} />}
        exact
      />
      <Route
        path={AppRoute.CONTENT_SETTING}
        render={(): JSX.Element => <WithHeader Component={PageContentEditor} />}
        exact
      />
      <Route
        path="/"
        render={(): JSX.Element => <WithHeader Component={Pages} />}
        exact
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Main;
