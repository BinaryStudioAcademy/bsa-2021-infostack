import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Switch } from 'components/common/common';
import Workspaces from 'components/workspaces/workspaces';
import Pages from 'components/pages/pages';
import Profile from 'components/profile/profile';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Switch>
          <Route path={AppRoute.ROOT} component={Counter} exact />
          <Route path={AppRoute.LOGIN} component={Login} exact />
          <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
          <Route path={AppRoute.WORKSPACES} component={Workspaces} exact />
          <Route path={AppRoute.PAGES} component={Pages} exact />
          <Route path={AppRoute.SETTINGS_PROFILE} component={Profile} exact />
        </Switch>
      </div>
    </>
  );
};

export default App;
