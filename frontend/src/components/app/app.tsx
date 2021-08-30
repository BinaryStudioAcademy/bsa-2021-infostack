import { ToastContainer } from 'react-toastify';
import { AppRoute } from 'common/enums';
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
import { SharedPage } from 'components/shared-page/shared-page';

const App: React.FC = () => {
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
        <Route path={AppRoute.SHARE} component={SharedPage} />
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
