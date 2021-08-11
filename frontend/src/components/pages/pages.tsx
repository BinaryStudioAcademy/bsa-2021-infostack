import PageContent from './components/page-content/page-content';
import { AppRoute } from 'common/enums/enums';
import { Switch } from 'components/common/common';
import ProtectedRoute from 'components/common/protected-route/protected-route';

const Pages: React.FC = () =>
  <Switch>
    <ProtectedRoute path={AppRoute.PAGE} component={PageContent} exact />
  </Switch>;

export default Pages;
