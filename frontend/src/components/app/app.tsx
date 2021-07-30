import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Switch } from 'components/common/common';
import Workspaces from 'components/workspaces/workspaces';
import Pages from 'components/pages/pages';
import Profile from 'components/profile/profile';
import ProtectedRoute from 'components/common/protected-route/protected-route';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Switch>
          <ProtectedRoute path={AppRoute.ROOT} component={Counter} exact />
          <Route path={AppRoute.LOGIN} component={Login} exact />
          <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
          <ProtectedRoute
            path={AppRoute.WORKSPACES}
            component={Workspaces}
            exact
          />
          <ProtectedRoute path={AppRoute.PAGES} component={Pages} exact />
          <ProtectedRoute
            path={AppRoute.SETTINGS_PROFILE}
            component={Profile}
            exact
          />
        </Switch>
      </div>
    </>
  );
};

export default App;
