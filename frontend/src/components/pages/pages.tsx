import { PageContent } from './components/components';
import { AppRoute } from 'common/enums/enums';
import { Switch } from 'components/common/common';
import { ProtectedRoute } from 'components/common/common';

const Pages: React.FC = () => (
  <Switch>
    <ProtectedRoute path={AppRoute.PAGE} component={PageContent} exact />
  </Switch>
);

export default Pages;
