import { useAppSelector } from 'hooks/hooks';
import { Spinner } from 'components/common/common';
import { Header, Toolbar } from './components/components';
import styles from './styles.module.scss';

export const WithHeader: React.FC<{ Component: React.FC }> = ({
  Component,
}) => {
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.grid}>
      {!currentWorkspace || !user ? (
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
