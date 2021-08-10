import { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  useHistory,
  useCookies,
} from 'hooks/hooks';
import { workspacesActions } from 'store/actions';
import { AppRoute, CookieVariable } from 'common/enums/enums';
import { Route, Switch } from 'components/common/common';
import withHeader from 'components/common/with-header/with-header';
import Pages from 'components/pages/pages';
import ProfileInfo from 'components/profile-info/profile-info';
import Workspace from 'components/workspace/workspace';
import Settings from 'components/settings/settings';
import NotFound from 'components/not-found/not-found';

const Main: React.FC = () => {
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [cookies] = useCookies([CookieVariable.WORKSPACE_ID]);

  useEffect(() => {
    if (!currentWorkspace) {
      if (cookies[CookieVariable.WORKSPACE_ID]) {
        dispatch(workspacesActions.loadWorkspace(cookies[CookieVariable.WORKSPACE_ID]));
      } else {
        history.push(AppRoute.WORKSPACES);
      }
    }
  }, [currentWorkspace]);

  return (
    <Switch>
      <Route path={AppRoute.PAGE} component={withHeader(Pages)} exact />
      <Route path={AppRoute.SETTINGS} component={withHeader(Settings)} />
      <Route path={AppRoute.PROFILE} component={withHeader(ProfileInfo)} key={Date.now()} />
      <Route
        path={AppRoute.WORKSPACE_SETTING}
        component={withHeader(Workspace)}
        exact
      />
      <Route path="/" component={withHeader(Pages)} exact />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Main;
