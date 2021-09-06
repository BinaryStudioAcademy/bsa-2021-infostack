import { toast } from 'react-toastify';
import Image from 'react-bootstrap/Image';
import { userApi, pageApi } from 'services';
import { useAppSelector, useEffect, useParams, useState } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import { AppRoute } from 'common/enums';
import { IPageStatistic } from 'common/interfaces';
import { PageContent } from './components/components';
import { Switch, ProtectedRoute, Spinner } from 'components/common/common';
import { PagesStatistic, Chart } from './components/components';
import Logo from 'assets/img/workspace-welcome-logo.png';
import styles from './styles.module.scss';

const LIMIT = 5;

const Pages: React.FC = () => {
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const paramsId = useParams<{ id: string }>().id;
  const [recentPages, setRecentPages] = useState<IPageStatistic[]>();
  const [recentPagesLoading, setRecentPagesLoading] = useState(false);
  const [mostViewedPages, setMostViewedPages] = useState<IPageStatistic[]>();
  const [mostViewedPagesLoading, setMostViewedPagesLoading] = useState(false);
  const [mostUpdatedPages, setMostUpdatedPages] = useState<IPageStatistic[]>();
  const [mostUpdatedLoading, setMostUpdatedLoading] = useState(false);

  const userId = useAppSelector((state) => state.auth.user?.id);
  const getRecentPages = async (): Promise<void> => {
    setRecentPagesLoading(true);
    await userApi
      .getRecentPages(userId as string)
      .then((res) => {
        setRecentPages(res);
      })
      .catch(() => {
        toast.error('Can not get recent pages');
      });
    setRecentPagesLoading(false);
  };

  const getMostViewedPages = async (): Promise<void> => {
    setMostViewedPagesLoading(true);
    await pageApi
      .getMostViewedPages({ limit: LIMIT })
      .then((res) => {
        setMostViewedPages(res);
      })
      .catch(() => {
        toast.error('Can not get most viewed pages');
      });
    console.log(mostViewedPages);
    setMostViewedPagesLoading(false);
  };

  const getMostUpdatedPages = async (): Promise<void> => {
    setMostUpdatedLoading(true);
    await pageApi
      .getMostUpdatedPages({ limit: LIMIT })
      .then((res) => {
        setMostUpdatedPages(res);
      })
      .catch(() => {
        toast.error('Can not get most updated pages');
      });
    console.log(mostUpdatedPages);
    setMostUpdatedLoading(false);
  };

  useEffect(() => {
    if (!paramsId) {
      getRecentPages();
      getMostViewedPages();
      getMostUpdatedPages();
    }
  }, [paramsId]);

  return (
    <>
      <Switch>
        <ProtectedRoute path={AppRoute.PAGE} component={PageContent} exact />
      </Switch>
      {!paramsId && (
        <>
          {!recentPagesLoading &&
          !mostViewedPagesLoading &&
          !mostUpdatedLoading ? (
            <>
              {!recentPages?.length &&
                !mostViewedPages?.length &&
                !mostUpdatedPages?.length && (
                  <div className="d-flex flex-column justify-content-evenly align-items-center h-100">
                    <Image
                      src={Logo}
                      className={getAllowedClasses(styles.templateImage)}
                    />
                    <div
                      className={getAllowedClasses(
                        styles.welcomeText,
                        'd-flex flex-column align-items-center  text-center',
                      )}
                    >
                      <h1 className="my-3">{`Welcome to ${currentWorkspace?.title}`}</h1>
                      <h5 className="my-3">Please create new page.</h5>
                    </div>
                  </div>
                )}
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <PagesStatistic
                    loading={recentPagesLoading}
                    title="Recent pages"
                    placeholder="No recent pages"
                    pages={recentPages}
                    className="col-xl col-md"
                  />
                  <PagesStatistic
                    loading={mostViewedPagesLoading}
                    title="Most viewed pages for the last week"
                    placeholder="No viewed pages for the last week"
                    pages={mostViewedPages}
                    className="col-xl col-md"
                  />
                  <PagesStatistic
                    loading={mostUpdatedLoading}
                    title="Most updated pages for the last week"
                    placeholder="No updated pages for the last week"
                    pages={mostUpdatedPages}
                    className="col-xl col-md"
                  />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Chart
                    axes="Updates / Day"
                    className={getAllowedClasses(styles.chartCart)}
                  />
                </div>
              </div>
            </>
          ) : (
            <Spinner height={'12rem'} width={'12rem'} />
          )}
        </>
      )}
    </>
  );
};

export default Pages;
