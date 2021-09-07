import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { pagesActions } from 'store/actions';
import { Spinner } from 'components/common/common';
import { Header, Toolbar } from './components/components';
import styles from './styles.module.scss';

export const WithHeader: React.FC<{ Component: React.FC }> = ({
  Component,
}) => {
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const { user } = useAppSelector((state) => state.auth);
  const { isSpinner } = useAppSelector((state) => state.pages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pagesActions.getPagesAsync());
    dispatch(pagesActions.getPinnedPagesAsync());
  }, []);

  return (
    <div className={styles.grid}>
      {!currentWorkspace || !user || isSpinner ? (
        <Spinner height={'12rem'} width={'12rem'} />
      ) : (
        <>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.toolbar}>
            <Toolbar />
          </div>
          <div className={styles.content}>
            <Component />
          </div>
        </>
      )}
    </div>
  );
};
