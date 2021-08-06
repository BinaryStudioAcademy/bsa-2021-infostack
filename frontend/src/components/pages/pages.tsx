import PageContent from './components/page-content/page-content';
import { AppRoute } from 'common/enums/enums';
import ProtectedRoute from 'components/common/protected-route/protected-route';
import styles from './pages.module.scss';
import { Switch } from 'components/common/common';

const Pages: React.FC = () => {

  return (
    <div className={styles.content}>
      <Switch>
        <ProtectedRoute path={AppRoute.PAGE} component={PageContent} exact />
      </Switch>
    </div>
  );
};

export default Pages;
