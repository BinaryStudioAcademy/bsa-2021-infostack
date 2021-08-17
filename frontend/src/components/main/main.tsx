import {
  AppRoute,
  CookieVariable,
  LocalStorageVariable,
} from 'common/enums/enums';
import { Route, Switch, WithHeader } from 'components/common/common';
import NotFound from 'components/not-found/not-found';
import Pages from 'components/pages/pages';
import ProfileInfo from 'components/profile-info/profile-info';
import Settings from 'components/settings/settings';
import { ContentEditor } from 'components/pages/components/components';
import { PageContent } from 'components/pages/components/components';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useHistory,
  useCookies,
} from 'hooks/hooks';
import { authActions, workspacesActions } from 'store/actions';

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
        path={AppRoute.PAGE_PREVIOUS_VERSION}
        render={(): JSX.Element => <WithHeader Component={PageContent} />}
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
        path={AppRoute.CONTENT_SETTING}
        render={(): JSX.Element => <WithHeader Component={ContentEditor} />}
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
