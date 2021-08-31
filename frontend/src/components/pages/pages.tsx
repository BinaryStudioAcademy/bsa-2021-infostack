import Image from 'react-bootstrap/Image';
import { PageContent } from './components/components';
import { AppRoute } from 'common/enums';
import { Switch } from 'components/common/common';
import { ProtectedRoute } from 'components/common/common';
import { useAppSelector, useEffect, useParams, useState } from 'hooks/hooks';
import Logo from 'assets/img/workspace-welcome-logo.png';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { userApi } from 'services';
import { PagesRecent } from './components/pages-recent/pages-recent';
import { IPageRecent } from 'common/interfaces';

const Pages: React.FC = () => {
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const paramsId = useParams<{ id: string }>().id;
  const [recentPages, setRecentPages] = useState<IPageRecent[]>();

  const userId = useAppSelector((state) => state.auth.user?.id);
  const getRecentPages = async (): Promise<void> =>
    await userApi
      .getRecentPages(userId as string)
      .then((res) => {
        setRecentPages(res);
      })
      .catch((err) => {
        console.log('EROR', err);
      });

  useEffect(() => {
    getRecentPages();
  }, [paramsId]);

  return (
    <>
      <Switch>
        <ProtectedRoute path={AppRoute.PAGE} component={PageContent} exact />
      </Switch>
      {recentPages?.length
        ? !paramsId && (
            <PagesRecent pages={recentPages} className="col-xl-3 col-md-3" />
          )
        : !paramsId && (
            <div className="d-flex flex-column justify-content-around align-items-center h-100">
              <Image src={Logo} />
              <div
                className={getAllowedClasses(
                  styles.welcomeText,
                  'd-flex flex-column align-items-center  text-center',
                )}
              >
                <h1 className="my-3">{`Welcome to ${currentWorkspace?.title}`}</h1>
                <h5 className="my-3">
                  Please select a page or create a new one.
                </h5>
              </div>
            </div>
          )}
    </>
  );
};

export default Pages;
